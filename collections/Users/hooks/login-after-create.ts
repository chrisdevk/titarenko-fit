import { CollectionAfterChangeHook } from "payload";

interface LoginBody {
  email?: string;
  password?: string;
}

export const loginAfterCreate: CollectionAfterChangeHook = async ({
  doc,
  req,
  req: { payload },
  operation,
}) => {
  if (operation === "create" && !req.user) {
    const body = req.body as LoginBody;
    const { email, password } = body;

    if (email && password) {
      const { user, token } = await payload.login({
        collection: "users",
        data: { email, password },
        req,
      });

      return {
        ...doc,
        token,
        user,
      };
    }
  }

  return doc;
};
