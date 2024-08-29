import { FastifyInstance } from "fastify";
import { createLevel } from "./create-level";
import { listLevels } from "./list-levels";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { levelUser } from "./level-user";
import { updateLevel } from "./update-level";
import { getLevel } from "./get-level";

export async function levelRoutes(app: FastifyInstance) {
  app.post('/api/levels', { onRequest: verifyJWT }, createLevel)
  app.post('/api/levels/:levelId/:userId', { onRequest: verifyJWT }, levelUser)
  app.get('/api/levels', { onRequest: verifyJWT }, listLevels)
  app.patch('/api/levels/:levelId', { onRequest: verifyJWT }, updateLevel)
  app.get('/api/levels/:levelId', { onRequest: verifyJWT }, getLevel)
}