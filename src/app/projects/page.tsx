import type { Metadata } from 'next';
import { getProjects } from '@/lib/storage';
import ProjectsClient from '@/components/projects/ProjectsClient';
import APRajanGardenCard from '@/components/home/APRajanGardenCard';

export const metadata: Metadata = {
  title: 'AP Rajan Garden Layout Masterplan | Plot 4 Tuty',
  description:
    'Explore AP Rajan Garden residential plotted community in Tharuvaikulam, Thoothukudi, Tamil Nadu. Walking distance to the beach, DTCP approved layout with 33ft roads, turnkey house construction, and up to 90% loan financing.',
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
