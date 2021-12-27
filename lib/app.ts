// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import * as cors from 'cors';
import * as firebase from "firebase";
import * as admin from 'firebase-admin';
//import "firebase/app";
//import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD1HHnvcDEd3kZLOpBMSlvuUrSEJ6VclqM",
  authDomain: "exia-students-d7b7d.firebaseapp.com",
  projectId: "exia-students-d7b7d",
  storageBucket: "exia-students-d7b7d.appspot.com",
  messagingSenderId: "945870702693",
  appId: "1:945870702693:web:9f2f33f9f590f4ddaa9e8c"
};


class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {

    this.app = express();
    // Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [
'http://10.76.100.22:8080',
  'http://localhost:8080',
  'http://192.168.0.13:8080',
];

  let fire = firebase.initializeApp(firebaseConfig);
  admin.initializeApp();
  //this.app.use(fire);

  //  this.app.use(cors(options));
    //this.app.use();

    //firebase.initializeApp(firebaseConfig);


    this.app.use(cors({ origin: true }));

    this.config();
    this.routePrv.routes(this.app);
    const chalk = require('chalk');
  }

  private config(): void {

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
