import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import UserProgress from '@/models/UserProgress';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserProgressSchema } from '@/lib/validations';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    //@ts-ignore
    const userId = session.user.id;

    const progress = await UserProgress.findOne({ userId });
    
    if (!progress) {
      return NextResponse.json({ tasks: [] }, { status: 200 });
    }

    return NextResponse.json({ tasks: progress.tasks }, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Zod Validation
    const validationResult = UserProgressSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid payload format', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tasks } = validationResult.data;

    await connectToDatabase();
    //@ts-ignore
    const userId = session.user.id;

    const updatedProgress = await UserProgress.findOneAndUpdate(
      { userId },
      { $set: { tasks: tasks } },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      { message: 'Progress saved successfully', tasks: updatedProgress.tasks },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving tasks:', error);
    return NextResponse.json(
      { error: 'Failed to save tasks' },
      { status: 500 }
    );
  }
}
