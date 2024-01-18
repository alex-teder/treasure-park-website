import { FastifyReply, FastifyRequest } from "fastify";
import {
  createCollection,
  deleteCollection,
  getCollection,
  updateCollection,
} from "./collections.service";
import {
  collectionsBodySchema,
  collectionsParamsSchema,
  createCollectionBodySchema,
} from "./collections.schema";

export async function getCollectionHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { collectionId } = collectionsParamsSchema.parse(request.params);
    const { collection, error } = await getCollection({ id: collectionId });
    if (error) return reply.code(404).send({ error });
    return reply.send(collection);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function createCollectionHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const input = createCollectionBodySchema.parse(request.body);
    if (input.userId !== request.user.id && !request.user.isAdmin) {
      return reply.code(403).send({ error: "Not allowed" });
    }
    const newCollection = await createCollection(input);
    return reply.send(newCollection);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function updateCollectionHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const input = collectionsBodySchema.parse(request.body);
    const { collectionId } = collectionsParamsSchema.parse(request.params);
    const actorId = request.user.isAdmin ? "*" : request.user.id;
    await updateCollection({ id: collectionId, actorId, input });
    return reply.send("ok");
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function deleteCollectionHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { collectionId } = collectionsParamsSchema.parse(request.params);
    await deleteCollection({
      id: collectionId,
      actorId: request.user.isAdmin ? "*" : request.user.id,
    });
    return reply.send("ok");
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}
