import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class ErrorWithCode extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function myErrorHandler(server: FastifyInstance) {
  return function handleError(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    if (error.statusCode && error.statusCode < 500) {
      return reply.code(error.statusCode).send(error);
    }
    server.log.error(error);
    console.error(error);
    return reply.code(500).send(new Error("Something went wrong."));
  };
}
