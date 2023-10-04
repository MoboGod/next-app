import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    NextResponse.json(validation.error.errors, { status: 400 });
  }

  const found = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (found) {
    return NextResponse.json({ error: "User already exist" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email });
}
