import { Request, Response,NextFunction } from "express";
import ApiError from "../error/ApiError";


export default function (err: Error,req:Request,res:Response,next:NextFunction){
    if(err instanceof ApiError){
        return res.status((err as ApiError).status).json({message:err.message,name:err.name});
    }
    return res.status(500).json({message:"We don`t know what is it error on server"});
}