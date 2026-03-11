import Logout from "@/components/auth/logout";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatAppPage = () => {
  // const { user } = useAuthStore(); khi store thay đổi (kể cả không đổi user) thì component vẫn gọi lại
  const user = useAuthStore((s) => s.user); // chỉ quan sát mỗi user, khi user thay đổi thì component mới gọi lại

  return (
    <div>
      {user?.username}
      <Logout />
    </div>
  );
};

export default ChatAppPage;
