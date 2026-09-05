import { RATE } from "@/data/home/pricing";
export type ShippingMethod = "road" | "air";
export type ShippingInput = {
  price: number;
  quantity: number;
  weight: number;
  shipping: ShippingMethod;
};
export const DEMO_FEES = { serviceRate: 0.03, road: 28000, air: 65000 };
/** Demo pricing only. Replace this pure calculation with verified business rules. */
export function calculateShipping(input: ShippingInput) {
  const clamp = (value: number, min = 0) =>
    Number.isFinite(value) ? Math.min(1_000_000, Math.max(min, value)) : min;
  const goods = Math.round(
    clamp(input.price) * Math.floor(clamp(input.quantity, 1)) * RATE,
  );
  const fee = Math.round(goods * DEMO_FEES.serviceRate);
  const freight = Math.round(clamp(input.weight) * DEMO_FEES[input.shipping]);
  return { goods, fee, freight, total: goods + fee + freight };
}
