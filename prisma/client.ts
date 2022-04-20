import { PrismaClient } from "@prisma/client";
import AppError from "../errors/AppError";
import { Context } from "./context";

const prisma: PrismaClient = new PrismaClient({
  rejectOnNotFound: {
    findUnique: {
      Instrument: (err) => {
        throw new AppError(404, `Instrument Not Found`)
      },
    },
    findFirst: {
      Instrument: (err) => {
        throw new AppError(404, `Instrument Not Found`)
      },
    },
  }
});

const ctx: Context = { prisma };

export { prisma, ctx };