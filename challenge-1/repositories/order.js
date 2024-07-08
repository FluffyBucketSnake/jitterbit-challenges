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

export function findAllOrders(skip, limit) {
  return withOrders(async (orders) => {
    return orders
      .find({}, { projection: { _id: 0 } })
      .skip(skip)
      .limit(limit)
      .toArray();
  });
}

export function updateOrder(orderId, order) {
  return withOrders(async (orders) => {
    const result = await orders.updateOne({ orderId }, { $set: order });
    if (result.matchedCount === 0) {
      return null;
    }
    return order;
  });
}

export function removeOrder(orderId) {
  return withOrders(async (orders) => {
    await orders.deleteOne({ orderId });
  });
}
