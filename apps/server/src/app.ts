import express, { Application, Request, Response } from 'express';
import initChatbot from './chatbot';

const app: Application = express();

app.use(express.json());

const port: number = 3001;

const chatbotClient = initChatbot();

app.post('/join', async (req: Request, res: Response) => {
  const { channel } = req.body;

  const result = await chatbotClient.join(channel);

  if (result.length > 0) {
    res.json({ joined: result });
  }
});

app.get('/channels', (req: Request, res: Response) => {
  res.json({ channels: chatbotClient.getChannels() });
});

app.post('/part', async (req: Request, res: Response) => {
  const { channel } = req.body;

  const result = await chatbotClient.part(channel);

  if (result.length > 0) {
    res.json({ left: result });
  }
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
