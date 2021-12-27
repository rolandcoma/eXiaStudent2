import { Request, Response } from "express";
import Etudiant from "../models/etudiant.model";
import Information from "../models/evaletud.model";
import { UpdateOptions, DestroyOptions,Op } from "sequelize"
//import { Op } from "sequelize";
import  Eval  from "../models/eval.model";
import {EtudiantInterface} from "../models/etudiant.model";
const chalk = require('chalk');
import * as firebase from 'firebase';

export class InformationsController {
  public async index(req:Request,res:Response){
    try{
      let infos = await Information.findAll();
      res.status(200).json(infos);

    }
    catch(error){
      res.status(200).json(error);
    }

  }

  public async create(req:Request,res:Response){

  }

  public async show(req:Request,res:Response){

  }

  public async update(req:Request,res:Response){

  }

  public async delete(req:Request,res:Response){

  }
}
