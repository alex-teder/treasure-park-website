import { FastifyInstance } from "fastify";
import { searchHandler } from "./search.handler";

export async function searchRoutes(server: FastifyInstance) {
  server.get("/", searchHandler);
}
