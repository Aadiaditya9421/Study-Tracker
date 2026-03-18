import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";
import StudyPlan from "@/models/StudyPlan";
import { STUDY_DATA } from "@/utils/tasks-data";

import connectToDatabase from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
    });

    // Seed the user's study plan with the default data
    await StudyPlan.create({
      userId: user._id.toString(),
      sections: STUDY_DATA,
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message, stack: error.stack }, { status: 500 });
  }
}
