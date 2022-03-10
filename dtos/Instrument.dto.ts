import { Decimal } from "@prisma/client/runtime";
import { ImageDTO } from "./Image.dto";
import { BaseDTO } from "./Base.dto";
interface InstrumentDTO {
  name: string;
  type: string;
  brand: string;
  price: Decimal;
  info: string;
}

interface FullInstrumentDTO extends BaseDTO, InstrumentDTO {
  id: number;
  status: string;
  productImages?: ImageDTO[]
  userId: number | null
}

export {
  InstrumentDTO,
  FullInstrumentDTO
}