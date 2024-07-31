import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { verifyUserRole } from "@/http/middlewares/verify-user-role"
import { FastifyInstance } from "fastify"
import { createPrivilege } from "./create-privilege"
import { listPrivileges } from "./list-privileges"
import { getPrivilege } from "./get-privilege"
import { updateBadge } from "../badges/update-badge"
import { deleteBadge } from "../badges/delete-badge"


export async function privilegeRoutes(app: FastifyInstance) {
  app.post('/api/privileges', { onRequest: [verifyJWT, verifyUserRole('admin')] }, createPrivilege)
  app.patch('/api/privileges/:privilegeId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, updateBadge)
  app.delete('/api/privileges/:privilegeId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, deleteBadge)
  app.get('/api/privileges', { onRequest: verifyJWT }, listPrivileges)
  app.get('/api/privileges/:privilegeId', { onRequest: verifyJWT }, getPrivilege)
}