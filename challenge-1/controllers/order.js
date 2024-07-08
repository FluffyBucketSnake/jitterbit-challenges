import { z } from "zod";
import {
  createOrder,
  findAllOrders,
  findOrder,
  removeOrder,
  updateOrder,
} from "../repositories/order.js";

const orderInSchema = z
  .object({
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
  })
  .transform(({ items, valorTotal, dataCriacao, numeroPedido }) => ({
    orderId: numeroPedido,
    value: valorTotal,
    creationDate: dataCriacao,
    items: items.map(({ valorItem, quantidadeItem, idItem }) => ({
      productId: idItem,
      quantity: quantidadeItem,
      price: valorItem,
    })),
  }));

export async function postOrder(request, response) {
  const parsedBody = orderInSchema.parse(request.body);
  const order = await createOrder(parsedBody);
  if (order === null) {
    return response.status(400).send({
      message: "An order with the same ID already exists",
    });
  }
  response.status(201).send(order);
}

export async function getOrder(request, response) {
  const { orderId } = request.params;
  const order = await findOrder(orderId);
  if (order === null) {
    return response.status(404).send();
  }
  return response.status(200).send(order);
}

export async function indexOrders(request, response) {
  const { skip = 0, limit = 20 } = request.params;
  return response
    .status(200)
    .send(await findAllOrders(skip, Math.max(limit, 40)));
}

export async function putOrder(request, response) {
  const { orderId } = request.params;
  const parsedBody = orderInSchema.parse(request.body);
  const order = await updateOrder(orderId, parsedBody);
  if (order === null) {
    return response.status(404).send();
  }
  response.status(200).send(order);
}

export async function deleteOrder(request, response) {
  const { orderId } = request.params;
  await removeOrder(orderId);
  response.status(200).send();
}
