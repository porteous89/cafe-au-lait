import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || require('./config/stripe').STRIPE_PUBLIC_KEY);