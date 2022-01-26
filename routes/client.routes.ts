import express, {Request, Response} from "express";
import * as clientModel from "../models/client.models";
import * as uploadImg from "../controllers/uploadFile";
import {Client, BasicClient} from "../types/client.types";
const clientRouter = express.Router();

clientRouter.get("/", async (req: Request, res: Response) => {
    clientModel.getAll((err: Error, clients: Client[]) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }
        return res.status(200).json({...clients});
    })
});

clientRouter.post("/", async (req: Request, res: Response) => {
    const newClient = req.body;
    clientModel.create(newClient, (err: Error, message: object) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }
        res.status(200).json({...message});
    })
})

clientRouter.get("/:id", async (req: Request, res: Response) => {
    const clientId = req.params.id;
    clientModel.getOne(clientId, (err: Error, client: Client) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }
        return res.status(200).json({...client});
    })
})

clientRouter.put("/:id", async (req: Request, res: Response) => {
    const client: Client = req.body;
    clientModel.update(client, (err: Error, response:any) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }   
        return res.status(200).json({...response});
    })
})

clientRouter.delete("/:id/:rev", async (req: Request, res: Response) => {
    clientModel.deleteOne(req.params.id, req.params.rev, (err: Error) => {
        if (err) {
            return res.status(500).json({errorMessage:err.message});
        }   
        return res.status(200).json({message:"OK"});
    })
})

clientRouter.post("/upload/:id", function (req: Request, res: Response, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    console.log(req.params)
    uploadImg.upload(req, res, function(err: Error) {
  
        if(err) {
  
            // ERROR occured (here it can be occured due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            console.log(err)
            res.send(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            console.log("sucess")
            res.send("Success, Image uploaded!")
        }
    })
})

export {clientRouter};