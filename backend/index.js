import express from "express";
import dotenv from "dotenv";
import open from 'open';
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World!');
});

app.use('/books', booksRoute);

// Connect to MongoDB
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



