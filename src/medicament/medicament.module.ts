import { Module } from '@nestjs/common';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';

@Module({
  controllers: [MedicamentController],
  providers: [MedicamentService]
})
export class MedicamentModule {}
