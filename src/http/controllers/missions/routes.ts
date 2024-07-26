import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createMission } from "./create-mission";

export async function missionRoutes(app: FastifyInstance) {
  app.post('/api/missions', { onRequest: verifyJWT }, createMission)
}