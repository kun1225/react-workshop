'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// --- Initial Data ---
const initialCart = {
  items: [
    {
      id: 1,
      name: 'Quantum Laptop',
      price: 10,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Photon Mouse (Special Offer)',
      price: 5,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Gravity Keyboard',
      price: 8,
      quantity: 1,
    },
  ],
};

const calculateSubtotal = (items) => {
  return items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
};

const applyCoupon = (price, couponCode) => {
  if ((couponCode = 'SAVE5')) {
    return price - 5;
  }
  if (couponCode === 'HALFOFF') {
    return price * 0.5;
  }
  return price;
};

// Step 4: Calculate Shipping Fee
const calculateShipping = (price, shippingMethod) => {
  let shippingFee = shippingMethod === 'express' ? 10 : 5;

  return shippingFee;
};

// Step 5: Add Tax
const addTax = (price) => {
  return price * 1.1;
};

// Step 6: Deduct Loyalty Points
const deductPoints = (price, usePoints) => {
  if (usePoints) {
    return price - 15; // $15 off for using points
  }
  return price;
};

export default function AdvancedCheckoutPage() {
  const [cart] = useState(initialCart);
  const [couponCode, setCouponCode] = useState('');
  const [shippingMethod, setShippingMethod] =
    useState('standard');
  const [usePoints, setUsePoints] = useState(false);

  const checkoutSummary = (() => {
    const subtotal = calculateSubtotal(cart.items);

    const priceAfterCoupon = applyCoupon(
      subtotal,
      couponCode,
    );
    console.log(
      '🚀 ~ checkoutSummary ~ priceAfterCoupon:',
      priceAfterCoupon,
    );

    const shippingFee = calculateShipping(
      priceAfterCoupon,
      shippingMethod,
    );
    console.log(
      '🚀 ~ checkoutSummary ~ shippingFee:',
      shippingFee,
    );

    const finalPrice = deductPoints(
      priceAfterCoupon,
      usePoints,
    );
    console.log(
      '🚀 ~ checkoutSummary ~ finalPrice:',
      finalPrice,
    );

    return {
      subtotal,
      shippingFee,
      finalTotal: finalPrice,
    };
  })();

  return (
    <div className="container mx-auto flex min-h-screen items-start justify-center p-4 md:p-8">
      <Card className="w-full max-w-6xl">
        <CardHeader className="pb-8">
          <CardTitle>結帳系統</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Left Side: Cart & Options */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">
                您的購物車
              </h3>
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-8" />
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="coupon"
                    className="text-base"
                  >
                    優惠券代碼
                  </Label>
                  <Input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-base">
                    運送方式
                  </Label>
                  <Select
                    value={shippingMethod}
                    onValueChange={setShippingMethod}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        標準運送 ($25)
                      </SelectItem>
                      <SelectItem value="express">
                        快速運送 ($50)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Right Side: Summary */}
            <div className="rounded-lg bg-gray-100 p-8">
              <h3 className="mb-6 text-lg font-semibold">
                訂單摘要
              </h3>
              <div className="space-y-3 text-base">
                <div className="flex justify-between">
                  <span>商品小計</span>
                  <span>
                    ${checkoutSummary.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>運費</span>
                  <span>
                    $
                    {checkoutSummary.shippingFee.toFixed(2)}
                  </span>
                </div>

                {checkoutSummary.pointsDiscount < 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>會員點數折抵</span>
                    <span>
                      -$
                      {(-checkoutSummary.pointsDiscount).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                )}

                <Separator className="my-4" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>總計</span>
                  <span data-testid="total-price">
                    ${checkoutSummary.finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
