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

  app.put("/:id", async (req, res) => {
    const { mantraName, mantraCat, mantraContent } = req.body;
    const id = parseInt(req.params.id);
  
    if (!mantraContent || !mantraName || !mantraCat) {
      return res.status(400).send("All the fields required");
    }
  
    if (!id || isNaN(id)) {
      return res.status(400).send("ID must be a valid number");
    }
  
    try {
      const updatedMantra = await prisma.mantra.update({
        where: { id },
        data: { mantraName, mantraCat, mantraContent },
      });
      res.json(updatedMantra);
    } catch (error) {
      res.status(500).send("Oops, something went wrong");
    }
  });

app.listen(5000, () => {
console.log("Server listening at localhost: 5000");
});