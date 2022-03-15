import { PrismaClient } from "@prisma/client";
import { Context } from "./context";

const prisma: PrismaClient = new PrismaClient({
  rejectOnNotFound: {
    findUnique: {
      Instrument: (err) => {
        return new Error(`Instrument Not Found: ${err}`)
      },
    },
    findFirst: {
      Instrument: (err) => new Error(`Instrument Not Found: ${err}`),
    },
  }
});

const ctx: Context = { prisma };

export { prisma, ctx };