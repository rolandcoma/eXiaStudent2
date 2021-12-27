import { Table, Model, Column, ForeignKey, Scopes, DefaultScope, DataType} from 'sequelize-typescript';
//import { database } from "../config/database";
import  Etudiant  from "./etudiant.model";
import  Eval  from "./eval.model";
const chalk=require('chalk');


@DefaultScope(() => ({
  attributes: ['note'],
}))
@Table({timestamps:false})
export default class EvalEtud extends Model {

  @Column(DataType.STRING(1))
  public note!: string;

  @ForeignKey(() => Eval)
  @Column
  evalId! : number;

  @ForeignKey(() => Etudiant)
  @Column
  etudiantId! : number;


}
//database.addModels([EvalEtud,Etudiant]);


console.log(chalk.cyan("Coucou"));
//EvalEtud.sync({ force: false }).then(() => console.log("EvalEtud table created"));
