import { FastifyReply, FastifyRequest } from "fastify";
import { SearchQuery } from "./search.schema";
import { getSearchResults } from "./search.service";

export async function searchHandler(
  request: FastifyRequest<{ Querystring: SearchQuery }>,
  reply: FastifyReply
) {
  const categoryId = Number(request.query.category) || undefined;
  const results = await getSearchResults({ ...request.query, categoryId });
  return reply.send(results);
}
