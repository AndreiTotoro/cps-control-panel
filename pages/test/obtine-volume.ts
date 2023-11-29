import { Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Volum[]>
) {
  const volume = await prisma.volume.findMany({});

  res.status(200).json(volume);
  prisma.$disconnect();
}
