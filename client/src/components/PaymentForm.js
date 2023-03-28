import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ amount }) => {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      setProcessing(true);
  
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        setError(error.message);
        setProcessing(false);
      } else {
        const response = await fetch('/api/payment/charge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, token: paymentMethod }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          setPaymentSuccess(true);
        } else {
          setError(data.message);
        }
  
        setProcessing(false);
      }
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || processing}>
      {processing ? 'Processing...' : 'Pay'}
      </button>
      {
        Error && <p className="error-message" style={{color: 'red'}}>{Error}</p>
      }
      {
        paymentSuccess && <p className="success-message" style={{color: 'green'}}>Your payment was successful.</p>
      }
    </form>
    </div>
  );
};

export default PaymentForm;