import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'Connected to MongoDB' : 'Could not connect to MongoDB')
}
catch (err) {
    console.log(err)
}

const closeConnection = () => { 
    console.log('Closing connection')
    mongoose.disconnect()
}

const entriesSchema = new mongoose.Schema({
    category: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true}
})

const EntryModel = mongoose.model('Entry', entriesSchema)

const categoriesSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

const CategoryModel = mongoose.model('Category', categoriesSchema)

export {closeConnection, EntryModel, CategoryModel}