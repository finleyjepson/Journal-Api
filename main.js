import express from 'express'
import dotenv from 'dotenv'
import { EntryModel, CategoryModel } from './db.js'

dotenv.config()

const app = express() // Create an express app

app.use(express.json()) // Middleware to parse JSON from the request body

app.get('/', (req, res) => {
    res.send({ info: 'Journal API'})
})

app.get('/categories', async (req, res) => {
    res.send(await CategoryModel.find())
})

app.get('/entries', async (req, res) => {
    res.send(await EntryModel.find())
})

app.get('/entries/:id', async (req, res) => {
    const entry = await EntryModel.findById(req.params.id)
    console.log(entry)
    if (entry) {
        console.log(req.params)
        res.send(entry) // Send the entry object as a JSON response
    } else {
        console.log(`Entry not found with id: ${req.params.id}`) // Log error to the console
        res.status(404).send({ error: 'Entry does not exist'}) // Set status to 404 as entry was not found
    }
})

app.post('/entries', async (req, res) => {
    try {
        const cat = await CategoryModel.findOne({ name: req.body.category })
        // TODO: Validate the data
        const insertedEntry = await EntryModel.create(req.body) // Push the new entry to the db
        res.status(201).send(insertedEntry) // respond with 201 & the created entry
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

app.put('/entries/:id', async (req, res) => {
    try {
        const updateEntry = await EntryModel.findByIdAndUpdate(req.params.id ,req.body, { new: true })
        if (updateEntry) {
            res.send(updateEntry)
        } else {
            res.status(404).send({ error: 'Entry does not exist'})
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.delete('/entries/:id', async (req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id)
        if (deletedEntry) {
            res.send('Entry Deleted')
        } else {
            res.status(404).send({ error: 'Entry does not exist'})
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.listen(process.env.PORT) // Start the webserver on port 4000