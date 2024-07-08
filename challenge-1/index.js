import "dotenv/config.js";

import express from "express";
import router from "./router.js";

const { HOST_PORT } = process.env;

const app = express();
app.use(express.json());
app.use(router);

app.listen(HOST_PORT, () => {
  console.log(`Listening on port ${HOST_PORT}`);
});
