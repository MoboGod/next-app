import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  const found = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!found) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  } else {
    return NextResponse.json(found, { status: 200 });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const found = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!found) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const updateProduct = await prisma.product.update({
    where: { id: found.id },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(updateProduct, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const found = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!found) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const deletedProduct = await prisma.product.delete({
    where: { id: found.id },
  });

  return NextResponse.json(deletedProduct, { status: 200 });
}
