import express from "express";
import { z } from "zod";
import { postOrder } from "./controllers/order.js";

const HOST_PORT = 6000; //TODO: use dotenv

const app = express();
app.use(express.json());

app.post("/order", routeHandler(postOrder));

app.use((error, request, response, next) => {
  if (error instanceof z.ZodError) {
    return response.status(422).send({
      message: error.message,
    });
  }
  return next(error);
});

app.listen(HOST_PORT, () => {
  console.log(`Listening on port ${HOST_PORT}`);
});

function routeHandler(handler) {
  return async (request, response, next) => {
    try {
      return handler(request, response);
    } catch (error) {
      next(error);
    }
  };
}
