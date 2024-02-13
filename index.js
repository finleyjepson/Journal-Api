import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.PORT || 4000) // Start the webserver on port 4000