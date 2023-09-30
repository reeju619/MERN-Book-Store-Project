import express from "express";
import dotenv from "dotenv";
import open from 'open';
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// Middleware for parsing request body
app.use(express.json());


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World!');
});
// Route for Save a new Book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishedYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const books = await Book.create(newBook);

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    }
     catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log("App connected to database.");

    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`);
    });
})
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });



