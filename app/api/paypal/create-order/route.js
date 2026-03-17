import { NextResponse } from 'next/server';
import { Client, Environment, OrdersController, CheckoutPaymentIntent, ApiError, CustomError } from '@paypal/paypal-server-sdk';

const configureEnvironment = () => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set in environment variables');
  }

  return {
    clientId,
    clientSecret,
    environment: process.env.NODE_ENV === 'production' ? Environment.Live : Environment.Sandbox,
  };
};

const { clientId, clientSecret, environment } = configureEnvironment();

const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: clientId,
    oAuthClientSecret: clientSecret,
  },
  environment: environment,
});

const ordersController = new OrdersController(paypalClient);

export async function POST(request) {
  try {
    const { amount } = await request.json();
    
    const createOrderRequest = {
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: 'USD',
              value: amount,
            },
          },
        ],
      },
      prefer: 'return=representation',
    };

    const response = await ordersController.createOrder(createOrderRequest);

    if (response.statusCode !== 201) {
      console.error("Error creating PayPal order:", response);
      return NextResponse.json(
        { error: 'Error creating PayPal order' },
        { status: response.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { orderId: response.result.id },
      { status: 201 } // Changed to 201 Created
    );
  } catch (error) {
    console.error('Error in create-order API:', error);

    if (error instanceof ApiError) {
      console.error("PayPal API Error - Status:", error.statusCode);
      console.error("PayPal API Error - Headers:", error.headers);
      console.error("PayPal API Error - Body:", error.body);
      if (error instanceof CustomError) {
        console.error("PayPal Custom Error - Result:", error.result);
      }
      return NextResponse.json(
        { error: error.message || 'Error from PayPal API', details: error.result },
        { status: error.statusCode || 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
}