import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  rejectOnNotFound: {
    findFirst: {
      Instrument: (err) => new Error('Instrument Not Found'),
    },
    findUnique: {
      Instrument: (err) => new Error('Instrument Not Found'),
    }
  }
}
);

export default prisma;