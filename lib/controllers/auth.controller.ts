import { Request, Response, NextFunction } from "express";
import Etudiant from "../models/etudiant.model";
import { UpdateOptions, DestroyOptions } from "sequelize";
import  Eval  from "../models/eval.model";
import {EtudiantInterface} from "../models/etudiant.model";
import {EvalEtudController} from "./evaletud.controller";
const bcrypt = require('bcrypt');
const chalk = require('chalk');
var fs = require('fs');
import * as firebase from "firebase";
import * as admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyD1HHnvcDEd3kZLOpBMSlvuUrSEJ6VclqM",
  authDomain: "exia-students-d7b7d.firebaseapp.com",
  databaseURL: "https://exia-students-d7b7d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "exia-students-d7b7d",
  storageBucket: "exia-students-d7b7d.appspot.com",
  messagingSenderId: "945870702693",
  appId: "1:945870702693:web:9f2f33f9f590f4ddaa9e8c"
};

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration




var idToken

export class AuthController {
  evaletudController : EvalEtudController = new EvalEtudController();
  user: any;

  public  async auth(req: Request, res: Response, next: NextFunction) {
    try{

     console.log(chalk.red(req.query.password));

      let etudiant  =  await Etudiant.findOne({
        where:{
          email: req.query.email,
        },
        limit:1
      }).then((etudiant)=>{
        let email= req.query.email
        let password  = req.query.password;
        console.log(req.query);

        if(!(email && password)){
          res.status(500).json("email or password missing !");

        }

        console.log(password);
        if(! (etudiant.checkIfUnencryptPassWordIsValid(password)) ){
          res.status(500).json("Wrong password");



        }

        //res.status(200).json("connexion OK");
      //  firebase.initializeApp(firebaseConfig);
      console.log(chalk.cyan(firebase.auth().currentUser.email));
              next();



      });


        //res.status(501).json("Not logged !!!!!!!")


    }
    catch(e){res.json("erreur")}
  }


  public async login(req: Request, res: Response){
    try {


      //let user = await firebase.auth().currentUser;
      //console.log(user);

      let  user = await firebase.auth()
      .signInWithEmailAndPassword(req.body.email,req.body.password);
      idToken =  await user.getIdToken(false);

        console.log(chalk.red(idToken));
        console.log(chalk.green(user));
        res.status(200).json(idToken);



      //next();

    } catch (error) {
      res.status(500).json(error);

    }
  }

  public async isLogged(req:Request,res:Response,next:NextFunction){
    try {
      console.log(req.body);
      //if(!user){res.status(501).json({message:'Not Logged !!!'})}
      let decodedToken = await admin.auth().verifyIdToken(req.body.idToken);
    /*  if(decodedToken.email ==='rcoma@cesi.fr'){
        await admin.auth().setCustomUserClaims(decodedToken.uid, { tuteur: true,role:['etudiant','intervenant','parent'] });
        await admin.auth().updateUser(decodedToken.uid,{
          phoneNumber:'+33661045561',
          displayName:'Roland',
          photoURL:'https://secure.gravatar.com/avatar/0c0727de13691d43d983e6d186b3f5e9'
        });
      }*/

      console.log(decodedToken);
      //res.status(200).json(decodedToken);
      req.body.decodedToken = decodedToken;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      //return;
      //next();
    }//let user = await firebase.auth().currentUser;
    //if(user){ next();}

  }

  public async logout(req :Request,res:Response){
    try{
      firebase.auth().signOut();
      res.status(501).json({message:'Loggout ok !!!'})
      //next();
    }
    catch(e){res.status(500).json(e);}
  }

  public async getUser(req: Request, res: Response){
    try{
      let decodedToken = await admin.auth().verifyIdToken(req.body.idToken);
      console.log(decodedToken);
      let user :Etudiant = await Etudiant.findOne({where:{email:decodedToken.email}});
      console.log(user.prenom + user.nom);
      if(user)
        res.status(200).json({nom:user.nom,prenom:user.prenom});
      else
        res.status(500).json({nom:'',prenom:''});
    }
    catch(error){
res.status(500).json({nom:'',prenom:''});
    }
  }
}
