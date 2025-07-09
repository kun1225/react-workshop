'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  const [paymentMethod, setPaymentMethod] =
    useState('credit');

  return (
    <div className="checkout-container">
      <h1 className="mb-4 text-2xl font-bold">付款方式</h1>

      <div className="mb-4 flex w-fit gap-2 rounded-md border border-gray-200 p-2">
        <Button
          variant="ghost"
          className={
            paymentMethod === 'credit' ? 'active' : ''
          }
          onClick={() => setPaymentMethod('credit')}
        >
          信用卡
        </Button>
        <Button
          variant="ghost"
          className={
            paymentMethod === 'transfer' ? 'active' : ''
          }
          onClick={() => setPaymentMethod('transfer')}
        >
          銀行轉帳
        </Button>
      </div>

      {paymentMethod === 'credit' ? (
        <div className="flex flex-col items-start gap-2">
          <Input type="text" placeholder="卡號" />
          <Input type="text" placeholder="有效期限" />
          <Input type="text" placeholder="安全碼" />
          <Input type="text" placeholder="推薦人" />
        </div>
      ) : (
        <div className="space-y-1">
          <p>請轉帳至以下帳戶：</p>
          <b>帳號：123-456-789</b>
          <Input type="text" placeholder="推薦人" />
        </div>
      )}
    </div>
  );
}
