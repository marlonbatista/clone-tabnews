import { createRouter } from "next-connect";
import migrator from "models/migrator.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  return await migrator.listPendingMigrations(true).then((migrations) => {
    const stateCode = migrations.length > 0 ? 200 : 201;
    return response.status(stateCode).json(migrations);
  });
}

async function postHandler(request, response) {
  return await migrator.listPendingMigrations(false).then((migrations) => {
    console.log("Migrations applied:", migrations);
    const stateCode = migrations.length > 0 ? 201 : 200;
    return response.status(stateCode).json(migrations);
  });
}
