import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('pk_test_51RMMVJ4IxcU9Rg0vGuRvTtur5WHYae0A1J7WUT9gNhYF6oNwnFXzgWFa9Px3hbZtw9QCDv2AvELHAiIclz8UGaqC00wQui0D87');

const inputStyle = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': { color: '#a0aec0' },
    },
    invalid: { color: '#e53e3e' },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage')) || { price: 0, title: '' };
  const amount = selectedPackage.price;
  const title = selectedPackage.title;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { data } = await axios.post('http://localhost:8000/api/payment/create-payment-intent', {
        amount: amount * 100, // Stripe expects amount in paise
        currency: 'inr',
      });

      const cardElement = elements.getElement(CardNumberElement);

      const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        const userId = localStorage.getItem('userId');

        await axios.post('http://localhost:8000/api/payment/confirm-payment', {
          paymentIntentId: paymentIntent.id,
          userId,
          packageTitle: title,
          amount,
        });

        toast.success('Payment Successful!');
        navigate(userId ? '/user/dashboard' : '/login');
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      
      <form onSubmit={handlePayment} className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Card Payment</h2>
        <p className="text-gray-600 mb-2">You selected: <strong>{title}</strong></p>

        <label className="block mb-1 font-medium">Card Number</label>
        <div className="p-2 mb-4 border rounded"><CardNumberElement options={inputStyle} /></div>

        <label className="block mb-1 font-medium">Expiry Date</label>
        <div className="p-2 mb-4 border rounded"><CardExpiryElement options={inputStyle} /></div>

        <label className="block mb-1 font-medium">CVC</label>
        <div className="p-2 mb-4 border rounded"><CardCvcElement options={inputStyle} /></div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded"
        >
          {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </form>
    </>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
