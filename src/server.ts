import express from "express";
import { Request, Response } from "express";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req:Request, res: Response)=> {
    res.send("Hello Expreess");
})

app.listen(port, () => {
  console.log(`app listening on port ${port}\nlocalhost: http://localhost:3000`)
})