const express = require("express");
const controllers = require("../app/controllers");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../openapi.json');

const appRouter = express.Router();
const apiRouter = express.Router();

appRouter.get("/", controllers.main.index);

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

apiRouter.get("/api/v1/cars", controllers.api.v1.car.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.auth.authorize, controllers.api.v1.car.create);
apiRouter.put("/api/v1/cars/:id", [controllers.api.v1.auth.authorize, controllers.api.v1.car.setCar], controllers.api.v1.car.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.car.setCar, controllers.api.v1.car.show);
apiRouter.delete("/api/v1/cars/:id",[controllers.api.v1.auth.authorize, controllers.api.v1.car.setCar], controllers.api.v1.car.destroy);

apiRouter.post("/api/v1/auth/register", controllers.api.v1.auth.register);
apiRouter.post("/api/v1/auth/login", controllers.api.v1.auth.login);
apiRouter.get("/api/v1/auth/whoami", controllers.api.v1.auth.authorize, controllers.api.v1.auth.whoami);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

appRouter.use(apiRouter)

module.exports = appRouter;