import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddMedicamenttDto } from 'src/DTO/medicament/addMedicament';
import { updateMedicamentDto } from 'src/DTO/medicament/updateMedicament';
import { medicamentEntity } from 'src/entities/medicament.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class MedicamentService {


    constructor(
        @InjectRepository(medicamentEntity)
        private medicamentRepository: Repository<medicamentEntity>
        
      )
       {}
       
       getMedicament(user): Promise<medicamentEntity[]>
        {
          //if (user.role === UserRoleEnum.PHARMACIEN  )
            return this.medicamentRepository.find();
          //throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<medicamentEntity>
       {
         const medicament =  await this.medicamentRepository.findOne(id);
         if (!medicament)
           throw new NotFoundException(`medicament d'id ${id} n'existe pas`);
        // if (user.role === UserRoleEnum.PHARMACIEN )
            return medicament;
         //else
           //throw new UnauthorizedException();
       }
       
      
          
       async addMedicament( medicamentData: AddMedicamenttDto, user): Promise<medicamentEntity> {
         
        //if (user.role === UserRoleEnum.PHARMACIEN  )
          return await this.medicamentRepository.save(medicamentData);
       // throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putMedicament(id: string, newMedicament: updateMedicamentDto , user): Promise<medicamentEntity> {
      const medicament= await this.medicamentRepository.findOne(id);
        id= medicament.id;
      const updatedMedicament = await this.medicamentRepository.preload({
            id ,
            ...newMedicament
        });

        //console.log('Valeur de retour de preload : ', medicament);
           console.log('Valeur de retour de preload : ', updatedMedicament);
           console.log('user : ', user.role);
        if (!medicament) {
           throw new NotFoundException(`Le medicament d'id ${id} n'existe pas`);
        }
        //if (user.role === UserRoleEnum.PHARMACIEN )
             

              
          return await this.medicamentRepository.save(updatedMedicament);
             
           
        //throw new UnauthorizedException();
    
         }


         



         async softDeleteMedicament(id:string, user) {
          const medicament = await this.medicamentRepository.findOne({id});
         
          if (!medicament) {
            throw new NotFoundException('');
          }
         // if (user.role === UserRoleEnum.PHARMACIEN )
            return this.medicamentRepository.softDelete(id);
        //  else
          //  throw new UnauthorizedException('');
        }


        async restoreMedicament(id: string, user) {
          const medicament = await this.medicamentRepository.query("select * from medicament where id = ?", [id]);
          if (!medicament) {
            throw new NotFoundException('');
          }
         // if (user.role === UserRoleEnum.PHARMACIEN)
            return this.medicamentRepository.restore(id);
          //else
            //throw new UnauthorizedException('');
        }

}
