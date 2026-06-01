"use client";

import { GiftProductPage } from "@/components/GiftProductPage";
import { GIFT_PRODUCTS } from "@/data/giftProducts";

export default function Page() {
  return <GiftProductPage product={GIFT_PRODUCTS["limited-release-duo"]} />;
}
