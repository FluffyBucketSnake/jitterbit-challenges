import { withOrders } from "../db/mongo.js";

export function createOrder(order) {
  return withOrders(async (orders) => {
    if ((await orders.findOne({ orderId: order.id })) != null) {
      return null;
    }
    await orders.insertOne(order);
    return order;
  });
}

export function findOrder(orderId) {
  return withOrders(async (orders) => {
    return orders.findOne({ orderId }, { projection: { _id: 0 } });
  });
}
