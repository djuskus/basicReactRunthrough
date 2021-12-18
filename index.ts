import express, { Application, Request, Response } from "express";
import { Schema, model, connect, ConnectOptions } from "mongoose";
import cors from "cors";
const app: Application = express();
const port = 5000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://127.0.0.1:3000'
}));

// 4. Connect to MongoDB
connect("mongodb://127.0.0.1:27017/vanilla");

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  let messages = await getAllMessages();
  return res.status(200).send(messages);
});

app.get("/delete", async (req: Request, res: Response): Promise<Response> => {
  await clearAllMessages();
  return res.status(200).send({
    message: "cleared!",
  });
});

app.post("/", async (req: Request, res: Response): Promise<Response> => {
  let message: String = req.body.message;
  if (message == null) {
    return res.status(400).send({
      message: "Ain't no message here!",
    });
  }

  saveMessageToDB(req.body.message);
  return res.status(200).send({
    message: "Saved!",
  });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}

interface User {
  message: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  message: { type: String, required: true },
});

// 3. Create a Model.
const UserModel = model<User>("User", schema);

async function saveMessageToDB(dbMessage: string): Promise<void> {
  try {
    const doc = new UserModel({
      message: dbMessage,
    });
    await doc.save();
    console.log(doc.message); // 'bill@initech.com'
  } catch (err: any) {
    console.log(err);
  }
}

async function clearAllMessages(): Promise<void> {
    await UserModel.remove();
}

async function getAllMessages(): Promise<Array<string>> {
    return (await UserModel.find()).map((user: User) => {
        return user.message;
    });
}
