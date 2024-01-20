import { FastifyReply, FastifyRequest } from "fastify";
import { changeUserPermissions, deleteUser, findUserById } from "./users.service";
import { PermissionsBody, UsersParams } from "./users.schema";

export async function getUserHandler(
  request: FastifyRequest<{ Params: UsersParams }>,
  reply: FastifyReply
) {
  const { user } = await findUserById({ id: request.params.userId });
  return reply.send(user);
}

export async function changePermissionsHandler(
  request: FastifyRequest<{ Params: UsersParams; Body: PermissionsBody }>,
  reply: FastifyReply
) {
  await changeUserPermissions({ id: request.params.userId, input: request.body });
  return reply.send("ok");
}

export async function deleteUserHandler(
  request: FastifyRequest<{ Params: UsersParams }>,
  reply: FastifyReply
) {
  await deleteUser({ id: request.params.userId });
  return reply.send("user deleted");
}
