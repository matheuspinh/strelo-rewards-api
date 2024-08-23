import { FastifyInstance } from "fastify";
import { createLevel } from "./create-level";
import { listLevels } from "./list-levels";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { levelUser } from "./level-user";

export async function levelRoutes(app: FastifyInstance) {
  app.post('/api/levels', { onRequest: verifyJWT }, createLevel)
  app.post('/api/levels/:levelId/:userId', { onRequest: verifyJWT }, levelUser)
  app.get('/api/levels', { onRequest: verifyJWT }, listLevels)
}