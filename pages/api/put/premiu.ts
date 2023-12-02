import { Premiu, Regulament, Volum } from "@/types";
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
      const idPremiuSaFieEditat: string = req.body.id;

      const premiuUpdatat = await prisma.premii.update({
        where: {
          id: idPremiuSaFieEditat,
        },
        data: {
          titlu: req.body.titlu,
          link: req.body.link,
        },
      });

      res.status(200).json(premiuUpdatat);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    prisma.$disconnect();
  }
}
