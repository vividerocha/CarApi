import {AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  
  //quando não é necessário implementar um dto personalizado para cada retorno, basta incluir esse decorator no atributo que quer esconder.
  //@Exclude()
  @Column()
  password: string;

  @AfterInsert()
  logInsert(){
    console.log('Inserted User with id', this.id)
  }

  @AfterUpdate()
  logUpdate(){
    console.log('Updated user with id', this.id);
  }

  @AfterRemove()
  logRemove(){
    console.log('Removed user with id', this.id);
  }
}