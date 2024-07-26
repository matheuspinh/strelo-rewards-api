import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      companyId: string
      id: string
      role: 'admin' | 'user'
    }
  }
}
