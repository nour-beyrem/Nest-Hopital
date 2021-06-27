
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";
import { userEntity } from "./user.entity";


@Entity('patient')
export class patientEntity extends TimestampEntity{

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar'})
    nom: string;

    @Column({type: 'varchar'})
    prenom: string;

    @Column({type: 'varchar'})
    origine: string;

    @Column({type: 'varchar'})
    statutSociale: string;

    @Column({type: 'varchar'})
    profession: string;
    
    @Column({type: 'varchar'})
    systemeDeSoin: string;

    @Column({type: 'varchar'})
    AtcdMedicaux: string;

    @Column({type: 'varchar'})
    atcdHabituede: string;

    @Column({type: 'varchar'})
    atcdFamilaux: string;

    @Column({type: 'varchar'})
    atcdChirurgicaux: string;

    @Column({type: 'varchar'})
    obstetricaux: string;


    @Column({type: 'varchar'})
    motifConsultation: string;

    @Column({type: 'varchar'})
    signesActuels: string;

    @Column({})
    age: number;

    @Column({type: 'varchar'})
    radio: string;

    @Column({type: 'varchar'})
    bilan: string;

    @Column({type: 'varchar'})
    resultatExamenCliniue: string;

    @Column({type: 'varchar'})
    resultatExamenPhysique: string;

    @Column({type: 'varchar'})
    resultatRadio: string;

    @Column({type: 'varchar'})
    resultatBilan: string;

    @Column({type: 'varchar'})
    servicesAdmission: string;

    @Column({type: 'varchar'})
    natureUrgence: string;

    @Column({type: 'varchar'})
    traitementPrescrit: string;

    @Column({type: 'varchar'})
    evolution: string;

    @Column({type: 'varchar'})
    soindHygiene: string;

    @Column({type: 'varchar'})
    alimentation: string;

    @Column({type: 'varchar'})
    signeVitaux: string;

    @Column({type: 'varchar'})
    bilanPrelevee: string;

    @Column({type: 'varchar'})
    surveillance: string;

    @Column({type: 'varchar'})
    traitementAdministree: string;

    




    @ManyToOne( type=>userEntity, (user)=> user.patientMed,
    {
      
      nullable: true,  eager: true
     
    })
     medecin: userEntity;


     @ManyToOne( type=>userEntity, (user)=> user.patientInf,
     {
       
       nullable: true,  eager: true
      
     })
      infirmier: userEntity;
  
  
  
 
 
 
 

}




