import req from "supertest"
import server, { connectDB } from "../server"
import db from "../config/db"

describe("GET /api", () => {
    it('Should send back a callback response', async () => {
        const res = await req(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.message).toBe('API con express y typescript')

        expect(res.status).not.toBe(404)
        expect(res.body.message).not.toBe('API con express')
    })
})

jest.mock('../config/db')

describe('Connect to DB', () => {

    it('Should handle database connection error', async () => {

        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Connection error'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Couldnt connect to the database'))
    })
})

