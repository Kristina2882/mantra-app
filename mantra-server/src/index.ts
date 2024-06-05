import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.json({"message": "success!"});
})

app.listen(5000, () => {
console.log("Server listening at localhost: 5000");
});