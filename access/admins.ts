import type { FieldAccess } from "payload";
import { checkRole } from "./check-role";

export const admins: FieldAccess<any, any> = ({ req: { user } }) => {
  return checkRole(["admin"], user!);
};
