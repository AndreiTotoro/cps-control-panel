import { Volum } from "@/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Volum[] | { message: string }>
) {
  try {
    if (
      req.headers["security-phrase"] === process.env.NEXT_PUBLIC_SECURITY_PHRASE
    ) {
      const volume: Volum[] = await prisma.volume.findMany({});
      console.log(req.headers);
      res.status(200).json(volume);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
}
