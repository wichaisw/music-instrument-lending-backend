import { BaseDTO } from "./Base.dto";

interface ImageDTO {
  imageUrl: string;
  instrumentId: number;
}

interface FullImageDTO extends ImageDTO, BaseDTO {
  id: number;
}

export {
  ImageDTO,
  FullImageDTO
}