import { FastifyReply, FastifyRequest } from "fastify";
import { findUserById } from "./users.service";

export async function getUserHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  const { userId } = request.params;
  try {
    const { error, user } = await findUserById({ id: parseInt(userId) });
    if (error) return reply.code(404).send({ error });
    return reply.send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong." });
  }
}
