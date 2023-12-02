import { Premiu, Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Premiu | { message: string }>
) {
  try {
    if (
      req.headers["security-phrase"] === process.env.NEXT_PUBLIC_SECURITY_PHRASE
    ) {
      const idPremiuSaFieSters: string = req.body.id;

      const premiuSters = await prisma.premii.delete({
        where: {
          id: idPremiuSaFieSters,
        },
      });

      res.status(200).json(premiuSters);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    prisma.$disconnect();
  }
}
