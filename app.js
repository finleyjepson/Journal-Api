import express from 'express'
import dotenv from 'dotenv'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors'

dotenv.config()

const app = express() // Create an express app

app.use(cors()) // Enable CORS for all requests

app.use(express.json()) // Middleware to parse JSON from the request body

app.get('/', (req, res) => {
    res.send({ info: 'Journal API'})
})

// TODO: Move /categories to routes folder
// TODO: Complete categories CRUD
// TODO: ADVANCED: Modify "GET /categories/:id" to embed an array of all the entries in that category

app.get('/categories', async (req, res) => {
    res.send(await CategoryModel.find())
})

app.use('/entries', entryRoutes) // Use the entry routes from entry_routes.js

export default app