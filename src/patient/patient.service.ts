import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddPatientDto } from 'src/DTO/patient/addPatient';
import { updatePatientDto } from 'src/DTO/patient/updatePatient';
import { patientEntity } from 'src/entities/patient.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {


    constructor(
        @InjectRepository(patientEntity)
        private patientRepository: Repository<patientEntity>
        
      )
       {}


       getPatient(user): Promise<patientEntity[]>
        {
          if (user.role === UserRoleEnum.RECEPTION || user.role === UserRoleEnum.RADIOLOGUE || user.role === UserRoleEnum.MEDECIN || user.role === UserRoleEnum.INFIRMIER || user.role === UserRoleEnum.CHEFSERVICE || user.role === UserRoleEnum.BIOLOGISTE  )
            return this.patientRepository.find();
          throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<patientEntity>
       {
         const patient =  await this.patientRepository.findOne(id);
         if (!patient)
           throw new NotFoundException(`patient d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.RECEPTION || user.role === UserRoleEnum.RADIOLOGUE || user.role === UserRoleEnum.MEDECIN || user.role === UserRoleEnum.INFIRMIER || user.role === UserRoleEnum.CHEFSERVICE || user.role === UserRoleEnum.BIOLOGISTE )
            return patient;
         else
           throw new UnauthorizedException();
       }
       
      
         getPatientByMedcin(medecin): Promise<patientEntity[]>
         {
           if (medecin.role === UserRoleEnum.MEDECIN  )
              return this.patientRepository.find({medecin});
           throw new UnauthorizedException();
          }


          getPatientByInfirmier(infirmier): Promise<patientEntity[]>
          {
            if (infirmier.role === UserRoleEnum.INFIRMIER  )
               return this.patientRepository.find({infirmier});
            throw new UnauthorizedException();
           }
         
         
         
         
         
         
               
       
       async addPatient(patientData: AddPatientDto, user): Promise<patientEntity> {
         
        if (user.role === UserRoleEnum.RECEPTION  )
          return await this.patientRepository.save(patientData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putPatient(id: string, newPatient: updatePatientDto , user): Promise<patientEntity> {
      const patient= await this.patientRepository.findOne(id);
        id= patient.id;
      const updatedPatient = await this.patientRepository.preload({
            id ,
            ...newPatient
        });

        //console.log('Valeur de retour de preload : ', patient);
           console.log('Valeur de retour de preload : ', updatedPatient);
           console.log('user : ', user.role);
        if (!patient) {
           throw new NotFoundException(`Le patient d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.RECEPTION ||user.username ===  updatedPatient.medecin.username || user.username === updatedPatient.infirmier.username ||user.role === UserRoleEnum.RADIOLOGUE || user.role === UserRoleEnum.BIOLOGISTE)
             

              
          return await this.patientRepository.save(updatedPatient);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeletePatient(id:string, user) {
          const patient = await this.patientRepository.findOne({id});
         
          if (!patient) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.RECEPTION )
            return this.patientRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restorePatient(id: string, user) {
          const patient = await this.patientRepository.query("select * from patient where id = ?", [id]);
          if (!patient) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.RECEPTION)
            return this.patientRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
      
}
