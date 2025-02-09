import mongoose, { Connection } from 'mongoose'
import cors, { CorsOptions } from 'cors'
import router from "./src/index"
import morgan from 'morgan'
import express, {Express} from "express"

const app: Express = express()
const port: number = 1234

// Middleware
if (process.env.NODE_ENV === 'development') {
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions))
}
app.use(express.json())

// MongoDB database connection
const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

//Define router
app.use("/", router)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
