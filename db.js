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

// Mongoose Schema & Models
const entriesSchema = new mongoose.Schema({
    category: {type: mongoose.ObjectId, ref: 'Category', required: true},
    content: {type: String, required: true}
})/*, { _id: false }) */  // Disable _id for subdocuments entries

const EntryModel = mongoose.model('Entry', entriesSchema)

const categoriesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // entries: [entriesSchema]
})

const CategoryModel = mongoose.model('Category', categoriesSchema)

export {closeConnection, EntryModel, CategoryModel}