import { getEnquiries } from '@/lib/storage';
import SellerLeadsClient from './SellerLeadsClient';

export default async function SellerEnquiriesPage() {
  const enquiries = await getEnquiries();
  return <SellerLeadsClient initialEnquiries={enquiries} />;
}
