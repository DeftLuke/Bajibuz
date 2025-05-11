import { redirect } from 'next/navigation';

// The Support page already has contact information and a form.
// For simplicity, we redirect /contact to /support.
// If distinct content is needed for /contact, this page can be built out.
export default function ContactPage() {
  redirect('/support');
  // return null; // Or a minimal loading state if redirect isn't immediate on server.
}
