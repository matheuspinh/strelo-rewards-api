import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/users/register'
import { authenticate } from './authenticate'
import { listUsers } from './list-users'
import { getMe } from './get-me'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/auth/register', register)
  app.post('/api/auth/login', authenticate)
  app.get('/api/auth/me', { onRequest: verifyJWT }, getMe)
  app.get('/api/users', listUsers)
}
