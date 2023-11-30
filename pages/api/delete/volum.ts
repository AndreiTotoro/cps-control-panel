import { Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Volum | { message: string }>
) {
  try {
    if (
      req.headers["security-phrase"] === process.env.NEXT_PUBLIC_SECURITY_PHRASE
    ) {
      const idVolumSaFieSters: string = req.body.id;

      const volumSters = await prisma.volume.delete({
        where: {
          id: idVolumSaFieSters,
        },
      });

      res.status(200).json(volumSters);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    prisma.$disconnect();
  }
}
