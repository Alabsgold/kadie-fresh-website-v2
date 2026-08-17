"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionCookie, destroySessionCookie, verifyPassword } from "@/lib/auth";

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function login(email: string, password: string): Promise<LoginResult> {
  if (!email.trim() || !password) {
    return { ok: false, error: "Enter both your email and password to continue." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email: email.trim() } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { ok: false, error: "That email and password combination is not recognized." };
  }

  await createSessionCookie({ sub: user.id, email: user.email, name: user.name });
  return { ok: true };
}

export async function logout() {
  await destroySessionCookie();
  redirect("/studio/login");
}
