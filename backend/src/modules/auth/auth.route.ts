import { FastifyInstance } from "fastify";
import { logInHandler, signUpHandler } from "./auth.handler";
import zodToJsonSchema from "zod-to-json-schema";
import { authErrorSchema, authResponseSchema, logInSchema, signUpSchema } from "./auth.schema";

export async function authRoutes(server: FastifyInstance) {
  server.post(
    "/signup",
    {
      schema: {
        body: zodToJsonSchema(signUpSchema),
        response: {
          201: zodToJsonSchema(authResponseSchema),
          400: zodToJsonSchema(authErrorSchema),
          500: zodToJsonSchema(authErrorSchema),
        },
      },
    },
    signUpHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: zodToJsonSchema(logInSchema),
        response: {
          200: zodToJsonSchema(authResponseSchema),
          400: zodToJsonSchema(authErrorSchema),
          500: zodToJsonSchema(authErrorSchema),
        },
      },
    },
    logInHandler
  );
}
