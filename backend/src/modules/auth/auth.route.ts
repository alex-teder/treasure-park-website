import { FastifyInstance } from "fastify";
import { logInHandler, logOutHandler, signUpHandler, whoAmIHandler } from "./auth.handler";
import toJson from "zod-to-json-schema";
import { authErrorSchema, authResponseSchema, logInSchema, signUpSchema } from "./auth.schema";

export async function authRoutes(server: FastifyInstance) {
  server.post(
    "/signup",
    {
      schema: {
        body: toJson(signUpSchema),
        response: {
          201: toJson(authResponseSchema),
          400: toJson(authErrorSchema),
          500: toJson(authErrorSchema),
        },
      },
    },
    signUpHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: toJson(logInSchema),
        response: {
          200: toJson(authResponseSchema),
          400: toJson(authErrorSchema),
          500: toJson(authErrorSchema),
        },
      },
    },
    logInHandler
  );

  server.get(
    "/whoami",
    {
      schema: {
        response: {
          200: toJson(authResponseSchema),
          401: toJson(authErrorSchema),
          500: toJson(authErrorSchema),
        },
      },
    },
    whoAmIHandler
  );

  server.get("/logout", logOutHandler);
}
