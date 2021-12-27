// lib/models/eval.model.ts
import { Table, Model, Column, ForeignKey, Scopes, DefaultScope, BelongsToMany, PrimaryKey } from 'sequelize-typescript';
import {Association,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationMixin,
} from 'sequelize';

import Etudiant  from "./etudiant.model";
import  EvalEtud  from "./evaletud.model"
const chalk = require('chalk');


@Scopes(() => ({
  full: {
    attributes: ['titre'],
    include: [Etudiant,EvalEtud]
  },
  etudiant:{
    attributes:['titre']
  }
}))

@Table({timestamps:false})
export default class Eval extends Model<Eval> {

  @Column
  public titre!: string;

  @BelongsToMany(() => Etudiant,() => EvalEtud)
  etudiants?: Etudiant[];

  public getEtudiants!: BelongsToManyGetAssociationsMixin<Etudiant>; // Note the null assertions!
 public addEtudiant!: BelongsToManyAddAssociationMixin<Etudiant, number>;
 public addEtudiants!: BelongsToManyAddAssociationsMixin<Etudiant, number>;
 public hasEtudiant!: BelongsToManyHasAssociationMixin<Etudiant, number>;

}

export interface EvalInterface {
  titre: string;
}


//database.addModels([Eval]);




console.log(chalk.cyan("Eval"));

//Eval.sync({ force: false }).then(() => console.log("Evaluation table created"));
