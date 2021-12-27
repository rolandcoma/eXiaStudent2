// lib/models/node.model.ts
import { Table, Model, Column, ForeignKey, Scopes, DefaultScope, BelongsToMany, BelongsTo,HasMany,PrimaryKey } from 'sequelize-typescript';
import {
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,

} from 'sequelize';
import { database } from "../config/database";
import Eval  from "./eval.model";
import EvalEtud  from "./evaletud.model";
import Information from "./information.model";
const bcrypt = require('bcrypt');

const chalk = require('chalk');


@Scopes(() => ({
  full: {
    attributes:['id','nom','prenom','email','photo'],
    include: [Information,Eval]

  },
  eval:{
    attributes:['nom','prenom']
  }
}))




@Table({timestamps: false})
export default class Etudiant extends Model<Etudiant> {


  @Column
  public get nom(){return this.getDataValue('nom');}
  public set nom(value:string){this.setDataValue('nom',value.toUpperCase());}

  @Column
  public prenom!: string;

  @Column
  public photo!: Buffer;

  @Column
  public email! : string;

  @Column
  public password!: string;

  public hashPassword(){
    this.password =  bcrypt.hashSync(this.password,8);
    console.log(chalk.green(this.password));
    //this.password = this.password;
  }

  public checkIfUnencryptPassWordIsValid(pass: any){
    return bcrypt.compareSync(pass,this.password);
  }

  @BelongsToMany(() => Eval, () => EvalEtud)
  evals?: Eval[];
  public getEvals!: BelongsToManyGetAssociationsMixin<Eval>;
  public addEvals!: BelongsToManyAddAssociationsMixin<Eval,number>;
  public addEval!: BelongsToManyAddAssociationMixin<Eval,number>;

  @HasMany(()=>Information)
  public infos?: Information[];

  public getInfos!: HasManyGetAssociationsMixin<Information>;
  public addInfo!: HasManyAddAssociationMixin<Information, number>;
  public addInfos!: HasManyAddAssociationsMixin<Information, number>;

}


export interface EtudiantInterface {
  nom: string;
  prenom: string;
}

console.log(chalk.cyan("Etudiant"));
