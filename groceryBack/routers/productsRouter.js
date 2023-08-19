class ProductsRouter {
  constructor(express, controller) {
    this.express = express;
    this.controller = controller;
  }

  routes() {
    const router = this.express.Router();

    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:productId", this.controller.getOne.bind(this.controller));
    router.put("/:productId", this.controller.updateOne.bind(this.controller));
    router.post("/", this.controller.insertOne.bind(this.controller));
    return router;
  }
}

module.exports = ProductsRouter;
