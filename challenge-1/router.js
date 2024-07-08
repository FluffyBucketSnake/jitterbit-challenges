import { Router } from "express";
import { postOrder } from "./controllers/order.js";

function routeHandlerFor(handler) {
  return async (request, response, next) => {
    try {
      return handler(request, response);
    } catch (error) {
      next(error);
    }
  };
}

function errorHandler(error, _, response, next) {
  if (error instanceof z.ZodError) {
    return response.status(422).send({
      message: error.message,
    });
  }
  return next(error);
}

const router = Router();

router.post("/order", routeHandlerFor(postOrder));

router.use(errorHandler);

export default router;
