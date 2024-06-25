import type { UserRecord } from "firebase-admin/auth";

export const UserService = {
  isAdmin(user: UserRecord) {
    return user.customClaims?.admin;
  },
};
