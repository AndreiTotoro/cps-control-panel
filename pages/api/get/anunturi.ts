import { Anunt, Regulament, Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Anunt[] | { message: string }>
) {
  try {
    const anunturi: Anunt[] = await prisma.anunturi.findMany({});
    res.status(200).json(anunturi);
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}
