import { Anunt, Premiu, Regulament, Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Anunt | { message: string }>
) {
  try {
    if (
      req.headers["security-phrase"] === process.env.NEXT_PUBLIC_SECURITY_PHRASE
    ) {
      const idAnuntSaFieEditat: string = req.body.id;

      const anuntUpdatat = await prisma.anunturi.update({
        where: {
          id: idAnuntSaFieEditat,
        },
        data: {
          titlu: req.body.titlu,
          continut: req.body.anunt,
        },
      });

      res.status(200).json(anuntUpdatat);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    prisma.$disconnect();
  }
}
