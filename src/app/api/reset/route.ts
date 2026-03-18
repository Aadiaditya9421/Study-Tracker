import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import UserProgress from '@/models/UserProgress';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    //@ts-ignore
    const userId = session.user.id;

    // Reset works by overwriting the user's task array with an empty one
    await UserProgress.findOneAndUpdate(
      { userId },
      { $set: { tasks: [] } },
      { upsert: true }
    );

    return NextResponse.json(
      { message: 'All progress reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting tasks:', error);
    return NextResponse.json(
      { error: 'Failed to reset tasks' },
      { status: 500 }
    );
  }
}
