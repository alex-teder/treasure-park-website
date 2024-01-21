import { FastifyInstance } from "fastify";
import { getTags } from "./tags.service";

export async function tagsRoutes(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    const result = await getTags();
    return reply.send(result);
  });
}
