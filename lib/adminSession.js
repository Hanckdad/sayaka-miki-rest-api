"use server";

import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_NAME = "ADMIN_SESSION";

export function createSession(username) {
  const token = crypto.randomBytes(32).toString("hex");

  cookies().set(SESSION_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return { token, username };
}

export function destroySession() {
  cookies().delete(SESSION_NAME);
  return true;
}

export function verifySession() {
  const token = cookies().get(SESSION_NAME)?.value;
  return Boolean(token);
}