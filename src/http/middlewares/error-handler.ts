import { DatabaseError, ResourceNotFound } from "@/services/errors/general-errors";
import { InvalidCredentialsError, UserAlreadyExistsError, UserUnauthorizedError } from "@/services/errors/user-errors";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export const errorHandler = (error: Error, _: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Erro de validação', issues: error.format() });
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({ message: error.message });
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({ message: error.message });
  }

  if (error instanceof UserUnauthorizedError) {
    return reply.status(403).send({ message: error.message });
  }

  if (error instanceof ResourceNotFound) {
    return reply.status(404).send({ message: error.message });
  }

  if (error instanceof DatabaseError) {
    return reply.status(500).send({ message: error.message });
  }
  return reply.status(500).send({ message: error });
}