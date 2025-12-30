import "reflect-metadata"; // reading class-validation
import express from "express"; // using express
import helmet from "helmet"; // protect header
import cors from "cors"; // allow acception from other host
import compression from "compression"; // send reponse faster
import dotenv from "dotenv"; // select key from .env
import router from "./routes";
import { Request, Response } from "express"; // sort time will delete

//app config
dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
})
);
app.use(compression());
app.use(express.json()); // reading request body
app.use(express.urlencoded({ extended: true })); // reading request body 

// route - call api
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Expreess");
});

app.use("/api", router);  // app using route

// export express - runing app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}\nlocalhost: http://localhost:${port}`);
});