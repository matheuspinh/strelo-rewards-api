import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/users/register'
import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/users/login', authenticate)
}
