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
      const idVolumSaFieEditat: string = req.body.id;

      const volumUpdatat = await prisma.volume.update({
        where: {
          id: idVolumSaFieEditat,
        },
        data: {
          titlu: req.body.titlu,
          link: req.body.link,
        },
      });

      res.status(200).json(volumUpdatat);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    prisma.$disconnect();
  }
}
