import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createBadge } from "./create-badge";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { listBadges } from "./list-badges";
import { getBadge } from "./get-badge";
import { deleteBadge } from "./delete-badge";
import { updateBadge } from "./update-badge";

export async function badgeRoutes(app: FastifyInstance) {
  app.post('/api/badges', { onRequest: [verifyJWT, verifyUserRole('admin')] }, createBadge)
  app.get('/api/badges/:badgeId', { onRequest: verifyJWT }, getBadge)
  app.delete('/api/badges/:badgeId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, deleteBadge)
  app.patch('/api/badges/:badgeId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, updateBadge)
  app.get('/api/badges', { onRequest: verifyJWT }, listBadges)
}