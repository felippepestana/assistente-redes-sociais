import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";

const ADMIN_ACCESS_COOKIE = "ars_admin_access_token";
const ADMIN_REFRESH_COOKIE = "ars_admin_refresh_token";
const ADMIN_COOKIE_MAX_AGE = 60 * 60;

export type AdminUser = {
  id: string;
  email?: string;
};

export async function setAdminSessionCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE
  };

  cookieStore.set(ADMIN_ACCESS_COOKIE, accessToken, cookieOptions);
  cookieStore.set(ADMIN_REFRESH_COOKIE, refreshToken, cookieOptions);
}

export async function clearAdminSessionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_ACCESS_COOKIE);
  cookieStore.delete(ADMIN_REFRESH_COOKIE);
}

export async function getAdminUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;
  const supabase = getSupabaseAdmin();

  if (!accessToken || !supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email
  };
}

export async function requireAdminUser() {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
