import { FastifyInstance } from "fastify";
import { getFeed } from "./feed.service";

export async function feedRoutes(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    const feed = await getFeed();
    return reply.send(feed);
  });
}
