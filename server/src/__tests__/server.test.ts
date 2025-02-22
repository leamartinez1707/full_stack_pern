import db from "../config/db"
import { connectDB } from '../server'

jest.mock('../config/db')

describe('Connect to DB', () => {

    it('Should handle database connection error', async () => {

        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Connection error'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Couldnt connect to the database'))
    })
})

