import { IsOptional, MaxLength, MinLength } from "class-validator";
import { ErrorMessgaes } from "../error-message.common";

export class updateMedicamentDto {



    @IsOptional()
    @MinLength(3, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(10, {
      message: ErrorMessgaes.tooLong
    })
      nom: string;

      @IsOptional()
@MinLength(3, {
  message: ErrorMessgaes.tooShort
})
@MaxLength(10, {
  message: ErrorMessgaes.tooLong
})
  famille: string;
}