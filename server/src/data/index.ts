import { exit } from 'node:process';
import db from '../config/db';


const clearDB = async () => {

    try {
        await db.sync({ force: true })
        console.log('Database cleared')
        exit(0)  // exit the process with success
    } catch (error) {
        console.log(error)
        exit(1) // exit the process with failure
    }
}

if (process.argv[2] === '--clear') {
    clearDB()
}
