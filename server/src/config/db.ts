import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DB_URL!, {
    models: [__dirname + '/../models/**/*.model.ts'],

    // Desactivar logs de Sequelize
    logging: false
})

export default db