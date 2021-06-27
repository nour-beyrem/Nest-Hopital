import { UserRoleEnum } from "src/enums/user-role.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { patientEntity } from "./patient.entity";
import { TimestampEntity } from "./timestamp-entity";


@Entity('user')
export class userEntity extends TimestampEntity{
  


     @PrimaryColumn({
    length: 50,
    unique: true
     })
       username: string;  


    @Column({type: 'varchar', length: 50})
    prenom: string;
    @Column({type: 'varchar', length: 50})
    nom: string;
    @Column({type: 'varchar', nullable: true})
     sexe: string;
    @Column({type: 'varchar', nullable: true})
      adresse: string;
    @Column({})
        cin: number;
        
    @Column({type: 'enum',
        enum: UserRoleEnum})
       role: string;

    
    
    
    
    
     
    @Column({type: 'varchar', unique:true})
      email: string;
    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar'})
    salt: string;

   
   
   

   
  
  
    
    
    @OneToMany(type=>patientEntity, (patient) =>patient.medecin,{
        cascade: true,
    })
        patientMed: patientEntity[];   


     @OneToMany(type=>patientEntity, (patient) =>patient.infirmier,{
          cascade: true,
      })
          patientInf: patientEntity[];   
    




}








