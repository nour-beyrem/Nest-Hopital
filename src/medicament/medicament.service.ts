import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { medicamentEntity } from 'src/entities/medicament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicamentService {


    constructor(
        @InjectRepository(medicamentEntity)
        private medicamentRepository: Repository<medicamentEntity>
        
      )
       {}

}
