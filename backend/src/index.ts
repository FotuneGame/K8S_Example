import "dotenv/config";
import express, {Router,Express,Request,Response,NextFunction} from "express";
import fileUpload from "express-fileupload";
import ApiError from "./error/ApiError";
import errorWare from "./middleware/errorWare";
import cors from "cors";
import path from "path";
import fs from "fs";
import fs_promises from "fs/promises";



const PORT = process.env.PORT || 3001
const ULR_CORS  = process.env.ULR_CORS || ['http://localhost:3000']
const STATIC_PATH_FILE = path.resolve(__dirname,"..","static","test.txt")

const app:Express = express();
const router:Router = express.Router();



router.get("/get",async (req:Request,res:Response,next:NextFunction)=>{
    const {random} = req.query;
    if (!random || !Number(random)) return next(ApiError.badRequest("Get","Have NOT random value in query"));

    // делаем массив из 100 чисел (заполняем значения индексами), затем преобразуем каждый элемент в строку
    const array = ["Длинна: " + random,...Array.from(Array(Number(random)).keys()).map((a)=>"element "+a)];

    try{
        if(!fs.existsSync(STATIC_PATH_FILE)){
            await fs_promises.writeFile(STATIC_PATH_FILE, new Date().toDateString());
            res.send(["Данные записаны в файл (volumes)",...array]);
        }
        else {
            const file_data = await fs_promises.readFile(STATIC_PATH_FILE, { encoding: 'utf8' });
            res.send(["Данные из файла (volumes): "+file_data,...array]);
        }
    }catch{
        return next(ApiError.noUploadFile("Get","Can`t load or read file((("));
    }

});



app.use(cors({
    origin: function (origin,callback){
        if(!origin || origin && ULR_CORS.includes(origin))
            callback(null,true);
        else
            callback(ApiError.forbidden("CORS","Not allowed by CORS"));
    },
    allowedHeaders:['Authorization','Content-Type']
}));
app.use(express.json());
app.use("/api",router);
app.use("/public",express.static(path.join(__dirname,"..", 'public')));
app.use(fileUpload({createParentPath: true}));
app.use(errorWare);



app.listen(PORT,()=>{
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
})