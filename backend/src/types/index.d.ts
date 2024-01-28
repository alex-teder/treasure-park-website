import {
  FastifyLoggerInstance,
  FastifyPluginAsync,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify";
import "@fastify/jwt";

declare module "fastify" {
  export interface FastifyContextConfig {
    protected?: boolean;
    adminOnly?: boolean;
  }
}

type AuthenticatedUser = {
  id: number;
  email: string;
  isAdmin: boolean;
};

type CustomAttributeType = "smallText" | "bigText" | "number" | "checkbox" | "date";
type CustomAttributeValue = string | number | boolean;

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: AuthenticatedUser;
  }
}
