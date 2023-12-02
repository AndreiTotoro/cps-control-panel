import { Regulament, Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Regulament[] | { message: string }>
) {
  try {
    const regulamente: Regulament[] = await prisma.regulamente.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(regulamente);
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}
