import express, {request, response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';
import path from 'path';


import { router } from "./routes"

const app = express();
app.use(express.json());

//Habilitando o CORS
//Bibliotecas:  cors e  @types/cors
app.use(cors());

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..',  'tmp'))    
)

//Middleware para filtrar a mensagem de erro (Mostrar de uma maneira mais amigável)
//Biblioteca: express-async-errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        //Se for uma uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message:  'Internal Server Error'

    })
    
})

app.listen(3333, () => console.log(`Servidor online!`))
