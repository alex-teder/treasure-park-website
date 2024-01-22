import { FastifyReply, FastifyRequest } from "fastify";
import { CreateItemBody, ItemsBody, ItemsParams } from "./items.schema";
import { createItem, deleteItem, getItem, updateItem } from "./items.service";

export async function getItemHandler(
  request: FastifyRequest<{ Params: ItemsParams }>,
  reply: FastifyReply
) {
  const { item } = await getItem({ id: request.params.itemId });
  reply.send(item);
}

export async function createItemHandler(
  request: FastifyRequest<{ Body: CreateItemBody }>,
  reply: FastifyReply
) {
  const isAdminAction = request.user.isAdmin;
  await createItem({ input: request.body, actorId: isAdminAction ? undefined : request.user.id });
  return reply.code(201).send("ok");
}

export async function updateItemHandler(
  request: FastifyRequest<{ Params: ItemsParams; Body: ItemsBody }>,
  reply: FastifyReply
) {
  const isAdminAction = request.user.isAdmin;
  await updateItem({
    id: request.params.itemId,
    input: request.body,
    actorId: isAdminAction ? undefined : request.user.id,
  });
  return reply.send("ok");
}

export async function deleteItemHandler(
  request: FastifyRequest<{ Params: ItemsParams }>,
  reply: FastifyReply
) {
  const isAdminAction = request.user.isAdmin;
  await deleteItem({
    id: request.params.itemId,
    actorId: isAdminAction ? undefined : request.user.id,
  });
  return reply.send("ok");
}
