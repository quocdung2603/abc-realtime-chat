import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { useAuthStore } from '@/stores/useAuthStore';

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();

    navigate("/signin");
  }

  return (
    <Button onClick={handleLogout}>Đăng xuất</Button>
  );
};

export default Logout;