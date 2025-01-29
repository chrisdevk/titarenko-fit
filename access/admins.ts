import { checkRole } from "./check-role";
import type { AccessArgs } from "payload";

export const admins = ({ req: { user } }: AccessArgs<any>) => {
  return checkRole(["admin"], user!);
};
