import { Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const idVolumSaFieSters: string = req.body.id;

  await prisma.volume.delete({
    where: {
      id: idVolumSaFieSters,
    },
  });

  res.status(200).json("Volum sters cu succes!");
  prisma.$disconnect();
}
