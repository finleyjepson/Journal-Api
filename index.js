import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.PORT) // Start the webserver on port 4000