import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/users/register'
import { authenticate } from './authenticate'
import { listUsers } from './list-users'
import { getUser } from './get-user'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { deleteUser } from './delete-user'
import { updateUser } from './update-user'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/auth/login', authenticate)
  app.get('/api/auth/me', { onRequest: verifyJWT }, getUser)
  app.get('/api/users', { onRequest: verifyJWT }, listUsers)
  app.post('/api/users/register', { onRequest: verifyJWT }, register)
  app.delete('/api/users/:userId', { onRequest: [verifyJWT, verifyUserRole('admin')] }, deleteUser)
  app.get('/api/users/:userId', { onRequest: verifyJWT }, getUser)
  app.put('/api/users/:userId', { onRequest: verifyJWT }, updateUser)
}
