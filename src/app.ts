import fastify from 'fastify'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import { usersRoutes } from '@/http/controllers/users/routes'
import { errorHandler } from './http/middlewares/error-handler'
import multipart from '@fastify/multipart'
import { missionRoutes } from './http/controllers/missions/routes'
import { badgeRoutes } from './http/controllers/badges/routes'
import { privilegeRoutes } from './http/controllers/privileges/routes'
import { levelRoutes } from './http/controllers/levels/routes'

export const app = fastify()

app.register(fastifyCors)

app.register(multipart, { attachFieldsToBody: true })

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(missionRoutes)
app.register(badgeRoutes)
app.register(privilegeRoutes)
app.register(levelRoutes)

app.setErrorHandler(errorHandler)
