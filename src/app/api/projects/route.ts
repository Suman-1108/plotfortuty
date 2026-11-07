import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get('tenantId') || undefined;

    const projects = await getProjects(tenantId);
    return NextResponse.json({ success: true, count: projects.length, projects });
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionUser = getSessionUser(req);
    const body = await req.json();

    if (!body.name || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Project name and location are required' },
        { status: 400 }
      );
    }

    const tenantId = sessionUser?.tenantId || body.tenantId || 'tenant-sri-balaji-promoters';
    // For now projects can be saved in storage or mongodb
    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully',
        project: {
          ...body,
          tenantId,
          slug: (body.slug || body.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          id: `proj-${Date.now()}`
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}
