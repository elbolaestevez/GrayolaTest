import { cookies } from "next/headers";

export function getUserFromCookies() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const role = cookieStore.get("userRole")?.value;
  return { userId, role };
}
