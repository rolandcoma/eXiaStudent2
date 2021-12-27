import { Request, Response } from "express";
import  EvalEtud  from "../models/evaletud.model";
import Etudiant from "../models/etudiant.model";
import Eval from "../models/eval.model";
import Information from "../models/information.model";
import { Op } from "sequelize";
var fs = require('fs');
//var imageResizeCompress = require('image-resize-compress'); // ES5 with npm
import * as csv from 'csv-parser';
//import * as imageResizeCompress from 'image-resize-compress';
import { blobToURL, fromBlob,fromURL } from 'image-resize-compress';
//import { UpdateOptions, DestroyOptions } from "sequelize";
var sharp = require('sharp');

export class EvalEtudController {
  public  async initBDD(req: Request, res: Response) {
    try {

      let etudiant1 = new Etudiant();
      etudiant1.nom='COMA'
      etudiant1.prenom='Roland';
      etudiant1.photo = fs.readFileSync(__dirname+'/thumbnails/Roland COMA.jpg');
      etudiant1.email='rcoma@cesi.fr';
      etudiant1.save();

      let evaluation : Eval = new Eval();
      evaluation.titre = 'Merise';
      evaluation.save();

      evaluation = new Eval();
      evaluation.titre = 'Arbre Algèbre';
      evaluation.save();

      evaluation = new Eval();
      evaluation.titre = 'SQL';
      evaluation.save();

      evaluation = new Eval();
      evaluation.titre = 'EPI MCD';
      evaluation.save();


      evaluation = new Eval();
      evaluation.titre = 'CPT';
      evaluation.save();



      let evals :Array<Eval> = await Eval.findAll();

      let results=[];
      fs.createReadStream(__dirname+'/Data.csv',{encoding:'utf8'})
      .pipe( await csv({separator:';'}))
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log(results);
          for(let i=0;i<results.length;i++){
            let e : Etudiant = new Etudiant();
            //if(results[i].Nom != null)
            e.nom = results[i].NomPersonne;
            e.prenom = results[i].PrenomPersonne;
            e.email= results[i].EmailStagiaire;
            e.password = e.prenom; //just pour les tests
            //e.id = i+2;
            if(!(e.nom === 'BOUTFOUST' || e.nom === 'NGUEDJIO BILE' || e.nom==='SCHOENACKER') ){
               sharp(__dirname+'/Photos/'+e.nom+'.jpg')
                .resize(500,500)
                .toFile(__dirname+'/thumbnails/'+e.nom+'.jpg')
                .catch( err => { });
              e.photo = fs.readFileSync(__dirname+'/thumbnails/'+e.nom+'.jpg');
            }
            e.hashPassword();
            e.addEvals(evals);
            e.save();
          }
        });

        etudiant1.addEvals(evals);

        res.status(200).json("initBDD");


      }
      catch (e) {
        res.json(e);
      }
    }

    public async initInfo(req: Request, res: Response){
      for(let i=0;i<79;i++){
        let info = new Information();
        info.info=i+" bien";
        info.etat='+';
        info.save();
      }

      for(let i=0;i<79;i++){
        let info = new Information();
        info.info=i+" pas bien";
        info.etat='-';
        info.save();
      }

      let etudiants: Array<Etudiant> = await Etudiant.scope('full').findAll();
    //etudiant1.addEvals(evals);
    //etudiant1.save();
    //await console.log(etudiants);
      let infos = await Information.findAll();
      for(let i=0;i<79;i++){
        etudiants[i].addInfos([infos[i],infos[79+i]]);
      }
      res.status(200).json({infos:infos});
    }

  public  async note(req: Request, res: Response) {
    EvalEtud.update({
        note:'A'
      },
      {
        where: {
          [Op.and]: [
            { evalId: 1 },
            { etudiantId: 1 }
          ]
        },
        limit: 1,
      });
    res.status(200).json('note insert OK');
  }
}
