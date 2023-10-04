import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) {
    return NextResponse.json({ error: "This user not found" }, { status: 404 });
  } else {
    return NextResponse.json(user);
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  const body = await request.json();
  if (!body.email) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.emaild,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const found = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!found) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  const deletedUser = await prisma.user.delete({
    where: { id: found.id },
  });

  return NextResponse.json(deletedUser, { status: 200 });
}
