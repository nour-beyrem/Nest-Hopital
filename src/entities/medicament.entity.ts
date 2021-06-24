import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";


@Entity('medicament')
export class medicamentEntity extends TimestampEntity{

    @PrimaryGeneratedColumn()
    id: string;
  
    @Column({type: 'varchar'})
    nom: string;

    @Column({type: 'varchar'})
    famille: string;

    @Column({type: 'varchar'})
    forme: string;

    @Column({type: 'varchar'})
    dci: string;

    @Column({type: 'varchar'})
    indication: string;

    @Column({type: 'varchar'})
    contreIndication: string;

    @Column({})
    posologie: number;

    @Column({type: 'varchar'})
    conservation: string;
  
  
 
 
 
 

}
