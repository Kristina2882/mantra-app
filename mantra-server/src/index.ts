import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    const mantras = await prisma.mantra.findMany();
    res.json(mantras);
});

app.post("/", async (req, res) => {
    const { mantraName, mantraCat, mantraContent } = req.body;
  
    if (!mantraContent || !mantraName || !mantraCat) {
      return res.status(400).send("All the fields required");
    }
  
    try {
      const mantra = await prisma.mantra.create({
        data: { mantraName, mantraCat, mantraContent },
      });
      res.json(mantra);
    } catch (error) {
      res.status(500).send("Oops, something went wrong");
    }
  });

app.listen(5000, () => {
console.log("Server listening at localhost: 5000");
});