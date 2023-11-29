import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  id: string;
  test: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData[]>
) {
  const prismaTest = await prisma.test.findMany();

  console.log(prismaTest);

  res.status(200).json(prismaTest);
}
