import { Decimal } from "@prisma/client/runtime";
import { ImageDTO } from "./Image.dto";
import { BaseDTO } from "./Base.dto";
import { ReviewDTO } from "./Review.dto";
import { ProductImage, Review } from "@prisma/client";
interface InstrumentDTO {
  name: string;
  type: string;
  brand: string;
  price: Decimal;
  info: string;
}

interface PostInstrumentDTO extends InstrumentDTO {
  id: number
  status: string
}

interface FullInstrumentDTO extends BaseDTO, InstrumentDTO {
  status: string;
  productImages?: ProductImage[]
  reviews: Review[]
  userId: number | null
}

export {
  InstrumentDTO,
  PostInstrumentDTO,
  FullInstrumentDTO
}