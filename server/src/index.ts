import {Request, Response, Router} from "express"
import { Book } from "../models/Book"

const router: Router = Router()

router.post("/api/book", async (req: Request, res: Response) => {
    try {
      const { author, name, pages } = req.body
      const book = new Book({ author, name, pages })
      await book.save()
      res.status(201).json(book)
    } catch (error) {
      res.status(400).json({ message: "Error creating a book", error })
      return
    }
})

router.get("/api/books", async (req:Request, res:Response) => {
    try {
        const books = await Book.find()
        res.status(201).json(books)

      } catch (error) {
        res.status(400).json({ message: "Error getting a books", error })
        return
      }
})

export default router