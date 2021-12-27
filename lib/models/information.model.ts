import { Table, Model, Column, ForeignKey, Scopes, DefaultScope, BelongsToMany, BelongsTo,HasMany,PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import {
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,

} from 'sequelize';
import Etudiant from "./etudiant.model";
//import {BelongsToSetAssociationMixin} from "sequelize";

@Table({timestamps:false})
export default class Information extends Model<Information> {

  @Column
  public info!: string;

  @Column
  public etat!: string;

  @ForeignKey(() => Etudiant)
  @Column
  public etudiantId!:number;


  @BelongsTo(() => Etudiant)
  etudiant?: Etudiant;

  


}
