import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ErrorMessgaes } from "../error-message.common";

export class AddPatientDto {



    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(3, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(10, {
      message: ErrorMessgaes.tooLong
    })
    prenom: string;
    @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
    @MinLength(3, {
      message: ErrorMessgaes.tooShort
    })
    @MaxLength(10, {
      message: ErrorMessgaes.tooLong
    })
    nom: string;
}