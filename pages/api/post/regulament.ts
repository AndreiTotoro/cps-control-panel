import { Regulament, Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Regulament | { message: string }>
) {
  try {
    if (
      req.headers["security-phrase"] === process.env.NEXT_PUBLIC_SECURITY_PHRASE
    ) {
      const dateRegulament: Regulament = req.body;

      const regulament = await prisma.regulamente.create({
        data: dateRegulament,
      });

      res.status(200).json(regulament);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}
