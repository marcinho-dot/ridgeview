"use client";

/**
 * CartProvider + useCart hook.
 *
 * Holds the basket state for the whole site. Static-export friendly -
 * everything lives client-side, persisted to `localStorage` under the
 * key `ridgeview-cart-v1`. The provider mounts once in `layout.tsx`
 * and is consumed by:
 *
 *   - `<CartButton />` in the Navbar (count badge + opens drawer)
 *   - `<CartDrawer />` (renders lines, qty controls, subtotal, CTA)
 *   - `<PurchaseWidget />` on each SKU page (calls `cart.add(...)`)
 *   - `<StickyMobileCTA />` on each SKU page (quick-adds the default
 *     75cl variant)
 *
 * Persistence is one-way write-on-change + read-on-mount. SSR-safe -
 * the initial state is an empty cart so the server-rendered HTML and
 * the client's first paint agree (no hydration mismatch); the real
 * cart is read from localStorage in a `useEffect` after mount.
 */

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AddInput,
  CartContextValue,
  CartItem,
  formatPence,
  lineId,
  UK_VAT_RATE,
  vatBreakdown,
} from "./types";

const STORAGE_KEY = "ridgeview-cart-v1";
// Free delivery threshold synced with the PurchaseWidget default
// (free UK next-day on orders over £45 received before 12 pm on a
// working day). Changing it: also update the SKU PurchaseWidget
// default + the drawer policy text.
const FREE_DELIVERY_PENCE = 4_500; // £45
const RECENTLY_ADDED_MS = 1200;

const CartContext = createContext<CartContextValue | null>(null);

interface PersistedCart {
  v: 1;
  items: CartItem[];
}

function readPersisted(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PersistedCart;
    if (!parsed || parsed.v !== 1 || !Array.isArray(parsed.items)) return [];
    // Defensive: drop any rows missing required fields.
    return parsed.items.filter(
      (x) =>
        x &&
        typeof x.id === "string" &&
        typeof x.slug === "string" &&
        typeof x.variantId === "string" &&
        typeof x.unitPricePence === "number" &&
        typeof x.quantity === "number" &&
        x.quantity > 0,
    );
  } catch {
    return [];
  }
}

function writePersisted(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    const payload: PersistedCart = { v: 1, items };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* private mode etc. - fine, cart just won't survive reload */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const hydrated = useRef(false);
  const addedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage AFTER first paint to avoid an SSR/CSR
  // mismatch. The "empty cart on first paint" flash is unavoidable
  // for static export - but it's invisible because the cart drawer
  // is closed by default and the badge "0" is hidden.
  useEffect(() => {
    setItems(readPersisted());
    hydrated.current = true;
  }, []);

  // Persist on every change (after hydration).
  useEffect(() => {
    if (!hydrated.current) return;
    writePersisted(items);
  }, [items]);

  // Cross-tab sync - if the user has the site open in two tabs and
  // adds in one, the other one's cart updates too.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setItems(readPersisted());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((input: AddInput): string => {
    const id = lineId(input.slug, input.variantId);
    const addQty = Math.max(1, input.quantity ?? 1);
    setItems((current) => {
      const existing = current.find((x) => x.id === id);
      if (existing) {
        return current.map((x) =>
          x.id === id
            ? { ...x, quantity: Math.min(99, x.quantity + addQty) }
            : x,
        );
      }
      const newLine: CartItem = {
        id,
        slug: input.slug,
        name: input.name,
        vintage: input.vintage,
        variantId: input.variantId,
        variantLabel: input.variantLabel,
        unitPricePence: input.unitPricePence,
        priceLabel: input.priceLabel,
        image: input.image,
        quantity: Math.min(99, addQty),
        note: input.note,
      };
      return [...current, newLine];
    });
    // Flash the "recently added" highlight on this line (drawer +
    // badge can read this and pulse).
    setRecentlyAddedId(id);
    if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current);
    addedTimeoutRef.current = setTimeout(
      () => setRecentlyAddedId(null),
      RECENTLY_ADDED_MS,
    );
    return id;
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) return current.filter((x) => x.id !== id);
      return current.map((x) =>
        x.id === id ? { ...x, quantity: Math.min(99, quantity) } : x,
      );
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, x) => sum + x.quantity, 0);
    const subtotalPence = items.reduce(
      (sum, x) => sum + x.unitPricePence * x.quantity,
      0,
    );
    // Wine prices in `wines.ts` are gross (VAT-inclusive), so we
    // back-compute the net + VAT split here for display.
    const { netPence, vatPence } = vatBreakdown(subtotalPence);
    const vatRatePct = Math.round(UK_VAT_RATE * 100);
    return {
      items,
      count,
      subtotalPence,
      subtotalLabel: formatPence(subtotalPence),
      netPence,
      netLabel: formatPence(netPence),
      vatPence,
      vatLabel: formatPence(vatPence),
      vatRateLabel: `${vatRatePct}%`,
      freeDeliveryThresholdPence: FREE_DELIVERY_PENCE,
      qualifiesForFreeDelivery: subtotalPence >= FREE_DELIVERY_PENCE,
      add,
      setQuantity,
      remove,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      recentlyAddedId,
    };
  }, [items, isDrawerOpen, recentlyAddedId, add, setQuantity, remove, clear, openDrawer, closeDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      "useCart() must be used inside <CartProvider>. " +
        "Make sure layout.tsx wraps the tree in <CartProvider>.",
    );
  }
  return ctx;
}
