import { NextResponse } from 'next/server';
import { Client, Environment, OrdersController, ApiError, CustomError } from '@paypal/paypal-server-sdk';

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

export async function POST(request, { params }) {
  try {
    const { orderId } = await params;
    
    // For capture, the body might be empty or contain specific details if needed
    const captureOrderRequest = {
      id: orderId,
      body: {},
      prefer: 'return=representation',
    };

    const response = await ordersController.captureOrder(captureOrderRequest);

    if (response.statusCode !== 201) {
      console.error("Error capturing PayPal order:", response);
      return NextResponse.json(
        { error: 'Error capturing PayPal order' },
        { status: response.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { success: true, captureId: response.result.id, status: response.result.status },
      { status: 201 } // Changed to 201 Created
    );
  } catch (error) {
    console.error('Error in capture-order API:', error);

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