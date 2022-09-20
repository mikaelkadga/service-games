const docsRouter = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

docsRouter.use("/api-docs", swaggerUi.serve);
docsRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));

// export default docsRouter;