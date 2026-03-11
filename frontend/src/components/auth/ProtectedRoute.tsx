import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { accessToken, refresh, fetchMe, user, loading } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !user) {
      await fetchMe();
    }

    setStarting(false);
  }

  useEffect(()=> {
    init();
  }, [])

  if (loading || starting) {
    return <p className="flex h-screen items-center justify-center">Đang tải trang...</p>
  }

  if (!accessToken) {
    return <Navigate to="/signin" replace />
  }


  return (
    <Outlet></Outlet>
  );
};

export default ProtectedRoute;  