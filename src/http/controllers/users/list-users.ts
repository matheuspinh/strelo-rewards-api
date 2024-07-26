import { makeListUsersService } from "@/services/factories/users/make-list-users-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {

  const { id } = request.user

  const service = makeListUsersService()
  const users = await service.execute(id)

  return reply.status(200).send(users)
}