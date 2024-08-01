import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { verifyUserRole } from "@/http/middlewares/verify-user-role"
import { FastifyInstance } from "fastify"
import { createPrivilege } from "./create-privilege"
import { listPrivileges } from "./list-privileges"
import { getPrivilege } from "./get-privilege"
import { updatePrivilege } from "./update-privilege"
import { deletePrivilege } from "./delete-privilege"


export async function privilegeRoutes(app: FastifyInstance) {
  app.post('/api/privilege', { onRequest: [verifyJWT, verifyUserRole('admin')] }, createPrivilege)
  app.patch('/api/privilege/:privilegeId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, updatePrivilege)
  app.delete('/api/privilege/:privilegeId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, deletePrivilege)
  app.get('/api/privileges', { onRequest: verifyJWT }, listPrivileges)
  app.get('/api/privilege/:privilegeId', { onRequest: verifyJWT }, getPrivilege)
}