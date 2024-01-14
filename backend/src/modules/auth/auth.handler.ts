import { FastifyReply, FastifyRequest } from "fastify";
import { logInSchema, signUpSchema } from "./auth.schema";
import { logIn, signUp } from "./auth.service";

export async function signUpHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const input = signUpSchema.parse(request.body);
    const { user, error } = await signUp(input);
    if (error) {
      return reply.code(400).send({ error });
    }
    return reply.code(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}

export async function logInHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const input = logInSchema.parse(request.body);
    const { user, error } = await logIn(input);
    if (error) {
      return reply.code(400).send({ error });
    }
    return reply.send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Something went wrong" });
  }
}
