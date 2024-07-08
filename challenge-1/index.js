import express from "express";
import router from "./router.js";

const HOST_PORT = 6000; //TODO: use dotenv

const app = express();
app.use(express.json());
app.use(router);

app.listen(HOST_PORT, () => {
  console.log(`Listening on port ${HOST_PORT}`);
});
