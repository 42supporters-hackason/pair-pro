import { languagesObject } from "../src/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  await prisma.skill.createMany({
    data: languagesObject,
  });
})();
