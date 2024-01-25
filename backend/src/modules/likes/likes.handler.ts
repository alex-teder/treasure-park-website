import { FastifyReply, FastifyRequest } from "fastify";
import { likeItem, unlikeItem } from "./likes.service";
import { LikeQuery } from "./likes.schema";

export async function likeItemHandler(
  request: FastifyRequest<{ Querystring: LikeQuery }>,
  reply: FastifyReply
) {
  await likeItem({ userId: request.user.id, itemId: request.query.itemId });
  return reply.send("ok");
}

export async function unlikeItemHandler(
  request: FastifyRequest<{ Querystring: LikeQuery }>,
  reply: FastifyReply
) {
  await unlikeItem({ userId: request.user.id, itemId: request.query.itemId });
  return reply.send("ok");
}
