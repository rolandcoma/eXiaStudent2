// lib/controllers/Evals.controller.ts
import { Request, Response } from "express";
import Eval from "../models/eval.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class EvalController {
  public index(req: Request, res: Response) {
    Eval.findAll<Eval>()
        .then((evals: Array<Eval>) => res.json(evals))
        .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
   const params: Eval = req.body;
   Eval.create<Eval>(params)
     .then((Eval: Eval) => res.status(201).json(Eval))
     .catch((err: Error) => res.status(500).json(err));
 }

  public show(req: Request, res: Response){
    const evalId = req.params.id;

    Eval.scope('full').findByPk<Eval>(evalId)
      .then((e: Eval | null) => {
        if (e) {
          res.json(e);
        } else {
          res.status(404).json({ errors: ["Eval not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public update(req: Request, res: Response) {
    const nodeId = req.params.id;
    const params: Eval = req.body;

    const update: UpdateOptions = {
      where: { id: nodeId },
      limit: 1,
    };

    Eval.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }

  public delete(req: Request, res: Response) {
   const EvalId = req.params.id;
   const options: DestroyOptions = {
     where: { id: EvalId },
     limit: 1,
   };

   Eval.destroy(options)
     .then(() => res.status(204).json({ data: "success" }))
     .catch((err: Error) => res.status(500).json(err));
 }

  public index2(req: Request, res: Response) {
    res.json({
      truc:["Hello world","Coucou"],
    });
  }
}
