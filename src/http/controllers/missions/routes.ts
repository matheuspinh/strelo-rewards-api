import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createMission } from "./create-mission";
import { listMissions } from "./list-missions";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { deleteMission } from "./delete-missions";
import { getMission } from "./get-mission";
import { updateMission } from "./update-mission";

export async function missionRoutes(app: FastifyInstance) {
  app.post('/api/missions', { onRequest: verifyJWT }, createMission)
  app.get('/api/missions', { onRequest: verifyJWT }, listMissions)
  app.delete('/api/missions/:id', { onRequest: [verifyJWT, verifyUserRole('admin')] }, deleteMission)
  app.get('/api/mission/:missionId', { onRequest: verifyJWT }, getMission)
  app.patch('/api/mission/:missionId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, updateMission)
}