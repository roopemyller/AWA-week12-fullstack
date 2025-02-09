import mongoose, {Document, Schema} from "mongoose"

interface IBook extends Document {
    name: string
    author: string
    pages: number
    _id: mongoose.Types.ObjectId
}

let bookSchema: Schema = new Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    pages: {type: Number, required: true}
}, {_id: true})

const Book: mongoose.Model<IBook> = mongoose.model<IBook>('Book', bookSchema)

export {Book, IBook}