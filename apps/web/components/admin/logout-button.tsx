"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST"
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button className="secondary-link" type="button" onClick={logout}>
      <LogOut size={17} aria-hidden="true" />
      Sair
    </button>
  );
}
