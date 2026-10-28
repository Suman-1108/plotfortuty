import type { Metadata } from 'next';
import { getProjects } from '@/lib/storage';
import ProjectsClient from '@/components/projects/ProjectsClient';
import APRajanGardenCard from '@/components/home/APRajanGardenCard';

export const metadata: Metadata = {
  title: 'Masterplan Layout Projects in Thoothukudi | Plot 4 Tuty',
  description:
    'Explore signature residential plotted communities in Thoothukudi, Tamil Nadu. AP Rajan Garden, Pearl Haven, Palayam Greens, and Harbour Enclave with DTCP and TNRERA approvals, wide roads, and sweet groundwater.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-[#F4F5F0]">
      <ProjectsClient projects={projects} />
      <APRajanGardenCard />
    </div>
  );
}
