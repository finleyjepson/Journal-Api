import express from 'express' // Import express framework

const categories = ['Food', 'Gaming', 'Coding', 'Other']

const entries = [
    { category: 'Food', title: 'My favorite food', content: 'My favorite food is pizza'},
    { category: 'Gaming', title: 'My favorite game', content: 'My favorite game is Minecraft'},
    { category: 'Coding', title: 'My favorite language', content: 'My favorite language is JavaScript'},
    { category: 'Other', title: 'My favorite animal', content: 'My favorite animal is a cat'}
]

const app = express() // Create an express app

app.use(express.json()) // Middleware to parse JSON from the request body

app.get('/', (req, res) => {
    res.send({ info: 'Journal API'})
})

app.get('/categories', (req, res) => {
    res.send(categories)
})

app.get('/entries/:id', (req, res) => {
    const entry = entries[req.params.id - 1 ] // Get the entry from the array using the id from the URL

    if (entry) {
        console.log(req.params)
        res.send(entry) // Send the entry object as a JSON response
    } else {
        console.log(`Entry not found with id: ${req.params.id}`) // Log error to the console
        res.status(404) // Set status to 404 as entry was not found
        res.send({ error: 'Entry does not exist'}) // Send an error message
    }
})

app.get('/entries', (req, res) => {
    res.send(entries)
})

app.post('/entries', (req, res) => {
    // Get the data from the request
    console.log(req.body)
    // TODO: Validate the data
    // Create a new entry object
    // Push the new entry to the array
    entries.push(req.body)
    // respond with 201 & the created entry
    res.status(201).send([entries.length -1])
})

app.listen(4000) // Start the webserver on port 4000