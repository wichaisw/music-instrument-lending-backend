import { PrismaClient } from "@prisma/client";

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


export default prisma;