import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// In a real application, this would import the OpenAI SDK or Google Gemini SDK
// import { GoogleGenerativeAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { topic } = await req.json();

    if (!topic) {
       return NextResponse.json({ message: 'Topic is required' }, { status: 400 });
    }

    // SIMULATED AI LATENCY & GENERATION
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulated LLM JSON Response tailored to the user's prompt
    const simulatedAIResponse = [
       { id: `ai-${Date.now()}-1`, title: `Introduction to ${topic} Core Concepts` },
       { id: `ai-${Date.now()}-2`, title: `Setup Development Environment for ${topic}` },
       { id: `ai-${Date.now()}-3`, title: `Build First ${topic} Project` },
       { id: `ai-${Date.now()}-4`, title: `Advanced Patterns & Architecture` },
    ];

    return NextResponse.json({ tasks: simulatedAIResponse }, { status: 200 });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
