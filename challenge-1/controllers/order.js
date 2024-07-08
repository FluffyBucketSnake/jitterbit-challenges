import { z } from "zod";

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
  console.log(parsedBody);
  response.status(201).send(parsedBody);
}
