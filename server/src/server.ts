import express from 'express';
import cors, { CorsOptions } from 'cors'
import router from './routes/router';
import db from './config/db';
import colors from 'colors';
import morgan from 'morgan';



// Conexion a base de datos
export const connectDB = async () => {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.bgGreen.white('Base de datos conectada'));
    } catch (error) {
        // console.log('Error: ', error);
        console.log(colors.bgRed.white('Couldnt connect to the database'));
    }
}
connectDB();
// Instancia de express
const server = express();
// Permitir conexiones externas
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de Cors'))
        }
    }

}
server.use(cors(corsOptions));
server.use(morgan('dev'));
// Leer datos de formularios
server.use(express.json());
server.use('/api/products', router);

server.get('/api', (req, res) => {
    res.json({ message: 'API con express y typescript' });
});



export default server;