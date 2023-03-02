import express, { Express, Request, Response } from 'express';
const app: Express = express();
const PORT = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send("Yes you're on the right path...");
});

app.get('/hi', (req: Request, res: Response) => {
  res.send('Hello there!');
});

app.listen(PORT, () => {
  console.log(`Now listening on Port ${PORT}`);
});
