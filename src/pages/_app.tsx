// src/pages/_app.tsx
import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AuthGuard from "../components/AuthGuard";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Protect /admin/* routes
  if (router.pathname.startsWith("/admin")) {
    return (
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    );
  }

  return <Component {...pageProps} />;
};