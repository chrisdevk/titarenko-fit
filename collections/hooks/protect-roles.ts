import { FieldHook } from "payload";
import type { User } from "../../payload-types";

export const protectRoles: FieldHook<{ id: string } & User> = ({
  data,
  req,
}) => {
  const isAdmin =
    req.user?.roles?.includes("admin") ||
    data?.email === "chris16305@gmail.com";

  if (!isAdmin) {
    return ["user"];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add("user");
  return [...userRoles];
};
