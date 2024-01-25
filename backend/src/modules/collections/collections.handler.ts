import { FastifyReply, FastifyRequest } from "fastify";
import {
  createCollection,
  deleteCollection,
  getCollection,
  getTopCollections,
  updateCollection,
} from "./collections.service";
import {
  UpdateCollectionBody,
  CreateCollectionBody,
  CollectionsParams,
} from "./collections.schema";
import { ErrorWithCode } from "../../utils/errors";

export async function getCollectionHandler(
  request: FastifyRequest<{ Params: CollectionsParams }>,
  reply: FastifyReply
) {
  const { collection } = await getCollection({ id: request.params.collectionId });
  return reply.send(collection);
}

export async function createCollectionHandler(
  request: FastifyRequest<{ Body: CreateCollectionBody }>,
  reply: FastifyReply
) {
  if (request.body.userId && !request.user.isAdmin) {
    throw new ErrorWithCode("Not allowed.", 403);
  }
  const userId = request.body.userId || request.user.id;
  await createCollection({ ...request.body, userId });
  return reply.code(201).send("ok");
}

export async function updateCollectionHandler(
  request: FastifyRequest<{ Body: UpdateCollectionBody; Params: CollectionsParams }>,
  reply: FastifyReply
) {
  const isAdminAction = request.user.isAdmin;
  await updateCollection({
    id: request.params.collectionId,
    actorId: isAdminAction ? undefined : request.user.id,
    input: request.body,
  });
  return reply.send("ok");
}

export async function deleteCollectionHandler(
  request: FastifyRequest<{ Params: CollectionsParams }>,
  reply: FastifyReply
) {
  const isAdminAction = request.user.isAdmin;
  await deleteCollection({
    id: request.params.collectionId,
    actorId: isAdminAction ? undefined : request.user.id,
  });
  return reply.send("ok");
}

export async function topCollectionsHandler(request: FastifyRequest, reply: FastifyReply) {
  const result = await getTopCollections();
  return reply.send(result);
}
