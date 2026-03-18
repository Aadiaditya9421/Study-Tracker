import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
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

    // Simulate Stripe Payment Intent Success and Webhook validation
    // In production, this would verify the Stripe-Signature header
    await User.findByIdAndUpdate(userId, { isPro: true });

    return NextResponse.json({ message: 'Successfully upgraded to Pro!' }, { status: 200 });
  } catch (error) {
    console.error('Upgrade Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
