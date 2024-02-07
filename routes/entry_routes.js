import { Router } from 'express'
import { EntryModel } from '../db.js'

const router = Router()

router.get('/', async (req, res) => res.send(await EntryModel.find().populate('category')))

router.get('/entries', async (req, res) => {
    res.send(await EntryModel.find())
})

router.get('/:id', async (req, res) => {
    const entry = await EntryModel.findById(req.params.id).populate('category') // Find the entry by id
    if (entry) {
        res.send(entry) // Send the entry object as a JSON response
    } else {
        res.status(404).send({ error: 'Entry does not exist'}) // Set status to 404 as entry was not found
    }
})

router.post('/', async (req, res) => {
    try {
        const insertedEntry = await (await EntryModel.create(req.body)).populate('category') // Push the new entry to the db
        res.status(201).send(insertedEntry) // respond with 201 & the created entry
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

export default router