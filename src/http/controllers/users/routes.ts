import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/users/register'
import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/auth/register', register)
  app.post('/api/auth/login', authenticate)
}
