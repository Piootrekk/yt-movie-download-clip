import express, { Express } from "express";
import { config } from "dotenv";
import router from "./routes";

config();

const app: Express = express();
const PORT = process.env.PORT;

if (!PORT) throw new Error("Port not found");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
