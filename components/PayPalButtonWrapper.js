// components/PayPalButtonWrapper.js
"use client"; // This is a client component

import { PayPalOneTimePaymentButton } from '@paypal/react-paypal-js/sdk-v6';
import { useRouter, useParams } from 'next/navigation';

export default function PayPalButtonWrapper() {
  const router = useRouter();
  const params = useParams();
  const locale = params.lang; // Assuming the locale is passed as 'lang' in the URL params

  const createOrder = async () => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: "1.00", // Example amount
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create PayPal order");
      }

      const { orderId } = await response.json();
      return { orderId };
    } catch (error) {
      console.error("Error in createOrder:", error);
      alert(error.message); // Display error to the user
      throw error; // Re-throw to let PayPal SDK handle it
    }
  };

  const onApprove = async ({ orderId }) => {
    try {
      const response = await fetch(`/api/paypal/capture-order/${orderId}`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to capture PayPal order");
      }

      console.log("Payment captured successfully!");
      console.log("Router object:", router);
      if (router) {
        const redirectPath = `/${locale}/payment-success`;
        router.push(redirectPath); // Redirect to success page with locale
        console.log(`Attempted redirection to ${redirectPath}`);
      } else {
        console.error("Router object is undefined or null, cannot redirect.");
      }
    } catch (error) {
      console.error("Error in onApprove:", error);
      alert(error.message); // Display error to the user
    }
  };

  return (
    <PayPalOneTimePaymentButton
      createOrder={createOrder}
      onApprove={onApprove}
      onCancel={() => alert("Payment cancelled!")}
      onError={(err) => {
        console.error("PayPal onError:", err);
        alert("An error occurred during payment. Please try again.");
      }}
    />
  );
}