// lib/config/routes.ts
//import { Request, Response } from "express";
import { EtudiantsController } from "../controllers/etudiants.controller";
import { EvalController } from "../controllers/eval.controller";
import {EvalEtudController} from "../controllers/evaletud.controller";
import {AuthController} from "../controllers/auth.controller";
import {InformationsController} from "../controllers/information.controller";
//import Express as express from "express";
import * as firebase from "firebase";


export class Routes {
  public etudiantsController: EtudiantsController = new EtudiantsController();
  public evalController: EvalController = new EvalController();
  public evaletudController: EvalEtudController = new EvalEtudController();
  public authController : AuthController = new AuthController();
  public infoController : InformationsController = new InformationsController();



  public routes(app): void {
    //app.use(cors);
    //let express: Express;
    //app.use(express.json());
    const auth = this.authController.auth;
    const fireAuth = this.authController.login;
    //app.use(this.authController.auth);
    app.route("/").get(this.evaletudController.initBDD);
    app.route("/note").get(auth,this.evaletudController.note);
    app.route("/login").post(fireAuth);
    app.route("/logout").get(this.authController.logout);
  //  const auth : AuthController = new AuthController();
const logAuth = this.authController.isLogged;
app.route("/etudiants/:id/evals/:evalId").put(this.etudiantsController.addNote);
/****------Evaluation---------**********/
app.route('/initInfo').get(this.evaletudController.initInfo);
app.route("/infos")
.get(this.infoController.index);
app.use(logAuth);

    app.route("/getUser").patch(this.authController.getUser);
    /****------Etudiant---------**********/
    app
      .route("/etudiants")
      .get(this.etudiantsController.index)
      .patch(this.etudiantsController.index)
      .post(this.etudiantsController.create)

    app
    .route("/etudiants/:id")
    .get(this.etudiantsController.show)
    .put(auth,this.etudiantsController.update)
    .delete(this.etudiantsController.delete);

    app
    .route("/etudiants/:id/evals")
    .get(this.etudiantsController.getEvals)
   .post(this.etudiantsController.postEval);
  //  .put(this.etudiantsController.putEval);

    /****------Evaluation---------**********/
    app
      .route("/evals")
      .get(this.evalController.index)
      .post(fireAuth,this.evalController.create);

    app
    .route("/evals/:id")
    .get(this.evalController.show)
    .put(auth,this.evalController.update)
    .delete(auth,this.evalController.delete);


  }
}
