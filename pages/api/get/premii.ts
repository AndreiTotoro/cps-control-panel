import { Premiu, Regulament, Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Premiu[] | { message: string }>
) {
  try {
    const premii: Premiu[] = await prisma.premii.findMany({});
    res.status(200).json(premii);
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}