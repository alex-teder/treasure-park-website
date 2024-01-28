import { FastifyInstance, FastifyRequest } from "fastify";
import { createCategory, deleteCategory, getAllCategories } from "./categories.service";

export async function categoriesRoutes(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    const result = await getAllCategories();
    reply.send(result);
  });

  server.post(
    "/",
    { config: { protected: true, adminOnly: true } },
    async (request: FastifyRequest<{ Body: { title: string } }>, reply) => {
      const { id } = await createCategory({ title: request.body.title });
      return reply.code(201).send(id);
    }
  );

  server.delete(
    "/:categoryId",
    { config: { protected: true, adminOnly: true } },
    async (request: FastifyRequest<{ Params: { categoryId: string } }>, reply) => {
      await deleteCategory({ id: parseInt(request.params.categoryId) });
      return reply.send("ok");
    }
  );
}
