import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import StudyPlan from '@/models/StudyPlan';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PlanUpdateSchema } from '@/lib/validations';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    //@ts-ignore 
    const userId = session.user.id;
    const plan = await StudyPlan.findOne({ userId });

    if (!plan) {
      return NextResponse.json({ sections: [] });
    }

    return NextResponse.json({ sections: plan.sections });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    // Zod validation
    const validationResult = PlanUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Invalid payload', errors: validationResult.error.flatten() }, { status: 400 });
    }

    const { sections } = validationResult.data;

    await connectToDatabase();
    //@ts-ignore
    const userId = session.user.id;

    const plan = await StudyPlan.findOneAndUpdate(
      { userId },
      { sections },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: 'Plan updated', sections: plan.sections });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
