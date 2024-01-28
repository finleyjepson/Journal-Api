import { EntryModel, CategoryModel ,closeConnection } from './db.js'

/* const categories = [
    { 
        name: 'Food',
        entries: [
            { content: 'This is my first entry', title: 'My first entry' }
        ] 
    },
    { 
        name: 'Gaming',
        entries: []
    },
    { 
        name: 'Coding',
        entries: [
            { content: 'This is my second entry', title: 'My second entry' }
        ]
    },
    { 
        name: 'Other',
        entries: [
            { content: 'This is my third entry', title: 'My third entry' }
        ]
    }
] */

const categories = [
    { 
        name: 'Food'
    },
    { 
        name: 'Gaming'
    },
    { 
        name: 'Coding'
    },
    { 
        name: 'Other'
    }
]

await CategoryModel.deleteMany()
console.log('Deleted all categories')
const cats = await CategoryModel.insertMany(categories)
console.log('Inserted categories')

const entries = [
    {
        category: cats[0]._id,
        title: 'My first entry',
        content: 'This is my first entry'
    },
    {
        category: cats[2]._id,
        title: 'My second entry',
        content: 'This is my second entry'
    },
    {
        category: cats[3]._id,
        title: 'My third entry',
        content: 'This is my third entry'
    }
]

await EntryModel.deleteMany()
console.log('Deleted all entries')
await EntryModel.insertMany(entries)
console.log('Inserted entries')

closeConnection() // Close the connection to the database 