import { DatabaseError } from "@planetscale/database";

export function parseDatabaseError(error: DatabaseError) {
  if (error.body.message.includes("code = AlreadyExists")) {
    if (error.body.message.includes("for key 'users.users_email_unique'")) {
      return "This email is already taken.";
    } else if (error.body.message.includes("for key 'users.users_username_unique'")) {
      return "This username is already taken.";
    }
  }
  return "Something went wrong.";
}
