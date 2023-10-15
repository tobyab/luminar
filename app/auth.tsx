"use client";

import { SessionProvider } from "next-auth/react";

export const Auth = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
