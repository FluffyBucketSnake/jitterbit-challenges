import { Router } from "express";
import {
  getOrder,
  indexOrders,
  putOrder,
  postOrder,
  deleteOrder,
} from "./controllers/order.js";
import { z } from "zod";
import { apiAuthentication } from "./middlewares/api-auth.js";

// Wraps async functions to ensure they are handled by
// Express.js error handling mechanism
function routeHandlerFor(handler) {
  return async (request, response, next) => {
    try {
      return handler(request, response);
    } catch (error) {
      next(error);
    }
  };
}

function errorHandler(error, _0, response, _1) {
  if (error instanceof z.ZodError) {
    return response.status(422).send({
      message: error.message,
    });
  }
  if (error.status != null) {
    return response.status(error.status).send({ message: error.message });
  }
  return response
    .status(500)
    .send({ message: "An unexpected error happened." });
}

const router = Router();

router.use(apiAuthentication);
router.post("/order", routeHandlerFor(postOrder));
router.get("/order/:orderId", routeHandlerFor(getOrder));
router.get("/order", routeHandlerFor(indexOrders));
router.put("/order/:orderId", routeHandlerFor(putOrder));
router.delete("/order/:orderId", routeHandlerFor(deleteOrder));

router.use(errorHandler);

export default router;
