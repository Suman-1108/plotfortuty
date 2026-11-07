import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPlots } from '@/lib/storage';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Plot 4 Tuty',
      description: 'The requested project could not be found on Plot 4 Tuty platform.'
    };
  }

  return {
    title: `${project.name} • DTCP Approved Plots & Villas in ${project.location} | Plot 4 Tuty`,
    description: `${project.name} in ${project.location}, Thoothukudi District. ${project.totalPlots} scheduled residential plots. ${project.tagline}`,
    openGraph: {
      title: `${project.name} | Plot 4 Tuty`,
      description: project.tagline,
      images: [project.image || '/images/ap-rajan-garden-layout.jpg']
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Retrieve plots belonging to this project
  const plots = await getPlots({ projectId: project.id });

  return <ProjectDetailClient project={project} initialPlots={plots} />;
}
