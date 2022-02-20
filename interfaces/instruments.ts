import { Decimal } from "@prisma/client/runtime";
import { IImages } from "./images";
import { Prisma } from '@prisma/client';
import { retrieveAllInstruments } from "../controllers/instruments";

export interface IInstrument {
  id?: number;
  name: string;
  type: string;
  brand: string;
  price: Decimal;
  info: string;
  status?: string;
  productImages?: IImages[]
}