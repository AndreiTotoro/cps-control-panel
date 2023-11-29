import { Volum } from "@/types";

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Volum>
) {
  const dateVolum: Volum = req.body;

  const volum = await prisma.volume.create({
    data: dateVolum,
  });

  res.status(200).json(volum);
  prisma.$disconnect();
}
