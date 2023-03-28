import { firebaseDB } from '@context/firebase/firebase';
import { addDoc, onSnapshot, collection } from 'firebase/firestore';
import getStripe from './initializeStripe';

export async function createCheckoutSession(uid: string) {
  const path = `users/${uid}/checkout_sessions`;

  const checkoutSessionRef = await addDoc(collection(firebaseDB, path), {
    price: 'plan_GwFVaTJvExUL8G',
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  onSnapshot(checkoutSessionRef, async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    }
  });
}
