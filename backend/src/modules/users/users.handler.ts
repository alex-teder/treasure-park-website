import { FastifyReply, FastifyRequest } from "fastify";
import { findUserById } from "./users.service";

export async function getUserHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const id = parseInt(request.params.userId);
  const { user } = await findUserById({ id });
  return reply.send(user);
}
