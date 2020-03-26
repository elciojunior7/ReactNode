const express = require("express"); //importar o módulo express
const routes = express.Router(); //instanciar aplicação

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const SessionController = require("./controllers/SessionController");

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncidentController.index);
routes.get("/incidents/byOng", IncidentController.listByOng);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;