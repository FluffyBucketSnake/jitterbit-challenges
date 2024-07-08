import express from "express";
import { z } from "zod";

const HOST_PORT = 6000; //TODO: use dotenv

const app = express();
app.use(express.json());

const orderInSchema = z.object({
  numeroPedido: z.string(),
  valorTotal: z.number().int(),
  dataCriacao: z.coerce.date(),
  items: z.array(
    z.object({
      idItem: z.coerce.number(),
      quantidadeItem: z.number().int(),
      valorItem: z.number().int(),
    }),
  ),
});

app.post("/order", async (request, response) => {
  const parsedBody = orderInSchema.parse(request.body);
  console.log(parsedBody);
  response.status(201).send(parsedBody);
});

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
