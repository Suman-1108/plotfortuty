import { getPlots } from '@/lib/storage';
import SellerPlotsClient from './SellerPlotsClient';

export default async function SellerPropertiesPage() {
  const plots = await getPlots();
  return <SellerPlotsClient initialPlots={plots} />;
}
