import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';

export async function GET() {
  await connectDB();

  await Category.create([
    { name: 'Computer Science' },
    { name: 'Music' },
    { name: 'Fitness' },
    { name: 'Photography' },
    { name: 'Accounting' },
    { name: 'Engineering' },
    { name: 'Filming' },
  ]);

  return NextResponse.json({ message: 'Success' });
}
