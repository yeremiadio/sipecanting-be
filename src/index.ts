import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '@/routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8080;

// Configure CORS to allow all origins
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});