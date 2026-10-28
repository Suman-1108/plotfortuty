import { redirect } from 'next/navigation';

// The main client display site IS the buyer site.
// A separate "Buyer Dashboard" has been removed; navigating to /customer redirects to home.
export default function CustomerRedirect() {
  redirect('/');
}
