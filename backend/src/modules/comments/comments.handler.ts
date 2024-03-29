import { FastifyReply, FastifyRequest } from "fastify";
import { CommentsBody, CommentsCountQuery, CommentsParams } from "./comments.schema";
import { createComment, deleteComment, getCommentsCount } from "./comments.service";

export async function createCommentHandler(
  request: FastifyRequest<{ Body: CommentsBody }>,
  reply: FastifyReply
) {
  await createComment({
    authorId: request.user.id,
    itemId: request.body.itemId,
    text: request.body.text,
  });
  return reply.code(201).send("ok");
}

export async function deleteCommentHandler(
  request: FastifyRequest<{ Params: CommentsParams }>,
  reply: FastifyReply
) {
  const isAdminAction = request.user.isAdmin;
  await deleteComment({
    actorId: isAdminAction ? undefined : request.user.id,
    id: request.params.commentId,
  });
  return reply.send("ok");
}

export async function getCommentsCountHandler(
  request: FastifyRequest<{ Querystring: CommentsCountQuery }>,
  reply: FastifyReply
) {
  const result = await getCommentsCount({ itemId: request.query.itemId });
  return reply.send(result);
}
