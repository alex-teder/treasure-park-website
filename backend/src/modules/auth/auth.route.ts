import { FastifyInstance } from "fastify";
import toJson from "zod-to-json-schema";
import { logInHandler, logOutHandler, signUpHandler, whoAmIHandler } from "./auth.handler";
import { authResponseSchema, logInBodySchema, signUpBodySchema } from "./auth.schema";

export async function authRoutes(server: FastifyInstance) {
  server.post(
    "/signup",
    {
      schema: {
        body: toJson(signUpBodySchema),
        response: {
          200: toJson(authResponseSchema),
        },
      },
    },
    signUpHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: toJson(logInBodySchema),
        response: {
          200: toJson(authResponseSchema),
        },
      },
    },
    logInHandler
  );

  server.get(
    "/whoami",
    {
      config: { protected: true },
      schema: {
        response: {
          200: toJson(authResponseSchema),
        },
      },
    },
    whoAmIHandler
  );

  server.get("/logout", logOutHandler);
}
