import { EntryModel, CategoryModel ,closeConnection } from './db.js'

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

const entries = [
    {
        category: 'Food',
        title: 'My first entry',
        content: 'This is my first entry'
    },
    {
        category: 'Coding',
        title: 'My second entry',
        content: 'This is my second entry'
    },
    {
        category: 'Other',
        title: 'My third entry',
        content: 'This is my third entry'
    }
]

await CategoryModel.deleteMany()
console.log('Deleted all categories')

await CategoryModel.insertMany(categories)
console.log('Inserted categories')

await EntryModel.deleteMany()
console.log('Deleted all entries')

await EntryModel.insertMany(entries)
console.log('Inserted entries')

closeConnection()