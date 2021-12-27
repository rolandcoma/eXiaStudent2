// lib/controllers/etudiants.controller.ts
import { Request, Response } from "express";
import Etudiant from "../models/etudiant.model";
import EvalEtud from "../models/evaletud.model";
import { UpdateOptions, DestroyOptions,Op } from "sequelize";
//import { Op } from "sequelize";
import  Eval  from "../models/eval.model";
import {EtudiantInterface} from "../models/etudiant.model";
const chalk = require('chalk');
import * as firebase from 'firebase';

export class EtudiantsController {
  public  async index(req: Request, res: Response) {
    try{
      //let etudiants : Etudiant = new Etudiant();
      //console.log(chalk.red('index : '+req.body.decodedToken.uid));
      let etudiants = await Etudiant.scope('full').findAll();
      res.status(200).json(etudiants);
    //    .catch((err: Error) => res.status(500).json(err));
      }catch(e){
        res.status(500).json(e);
      }
  }


  public create(req: Request, res: Response) {
  const params: Etudiant = req.body;
  //params.hashPassword();
  //params.save();
   Etudiant.create<Etudiant>(params)
     .then((etudiant: Etudiant) => {
       etudiant.hashPassword();
       etudiant.save();
       res.status(201).json(etudiant)
     })
     .catch((err: Error) => res.status(500).json(err));

 }

  public show(req: Request, res: Response){
    const etudiantId = req.params.id;

    Etudiant.scope('full').findByPk<Etudiant>(etudiantId)
      .then((etudiant: Etudiant | null) => {
        //const evals = etudiant.evals;
        if (etudiant) {
          res.json(etudiant);
        } else {
          res.status(404).json({ errors: ["Etudiant not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
    const nodeId = req.params.id;
    const params: EtudiantInterface = req.body;

    const update: UpdateOptions = {
      where: { id: nodeId },
      limit: 1,
    };

    Etudiant.update(params, update)
      .then(() => res.status(202).json({ data: "success"}))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
   const etudiantId = req.params.id;
   const options: DestroyOptions = {
     where: { id: etudiantId },
     limit: 1,
   };

   Etudiant.destroy(options)
     .then(() => res.status(204).json({ data: "success" }))
     .catch((err: Error) => res.status(500).json(err));
 }

  public addNote(req: Request, res: Response) {
    const etudiantId = req.params.id;
    const evalId = req.params.evalId;
    console.log(chalk.red(req.body.note));
    EvalEtud.update({
        note: req.body.note,
        evalId: evalId,
        etudiantId: etudiantId
    },
    {
      where:{
        [Op.and]: [
          { evalId: evalId },
          { etudiantId: etudiantId}
        ]
      },
      limit: 1
    });
    res.status(200).json({
      message: 'Nouvelle note enregistrée !!!!',
    //  user: firebase.auth().currentUser.email
    })
  }

  public async getEvals(req : Request, res : Response){
    const etudiant = await Etudiant.scope('full').findByPk(req.params.id)
    .then((etudiant)=>{
      res.status(200).json({
        etudiant : etudiant.nom,
        evals:etudiant.evals
      });
    }).catch((err)=>res.status(500).json(err));
  }

  private async noteEtudEval(etudiantId:number,evalId:number,marks:string){
    await EvalEtud.update({
        note:marks,
      },
      {
        where: {
          [Op.and]: [
            { evalId: evalId},
            { etudiantId: etudiantId }
          ]
        },
        limit: 1,
      }).catch((err)=>{console.log(err)});
  }

  public async postEval(req : Request, res : Response){
    const etudiant = await Etudiant.scope('full').findByPk(req.params.id)
    .then(async (etudiant)=>{
      console.log(req.body);
      let evaluation = new Eval();
      evaluation.titre = req.body.titre;
      evaluation.save();
      let evaluationBDD =  await Eval.findOne({where:{titre:req.body.titre}});
    //  etudiant.evals[evaluation.id-1].EvalEtud.note = req.body.note;
      console.log(evaluationBDD);
      etudiant.addEval(evaluationBDD);
  //    etudiant.save();


    //  this.noteEtudEval(etudiant.id,evaluationBDD.id,req.body.note);


    }).catch((err)=>res.status(500).json(err));
    res.status(200).json(etudiant);
  }
}
