// src/components/AuthGuard.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))?.split('=')[1];

      if (!token) {
        setIsAuthenticated(false);
        router.push('/auth/login');  // Redirect to login if no token
      } else {
        try {
          // Send token to the backend for verification
          const res = await fetch('/api/check-session', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.status === 200) {
            setIsAuthenticated(true);
            router.push('/admin/dashboard');  // Redirect to admin dashboard if authenticated
          } else {
            setIsAuthenticated(false);
            router.push('/auth/login');  // Redirect to login if session is invalid
          }
        } catch (error) {
          setIsAuthenticated(false);
          router.push('/auth/login');  // Redirect to login on error
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">
            You need to log in to access this page.
          </p>
            <Link  href="/auth/login" className="text-blue-500 hover:underline text-lg">
              Go to Login
            </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
