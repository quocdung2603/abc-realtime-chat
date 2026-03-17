import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,

      setAccessToken: (accessToken) => {
        set({ accessToken });
      },

      setUser: (user) => {
        set({user})
      },

      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        useChatStore.getState().reset();
        localStorage.clear();
        sessionStorage.clear();
      },

      signUp: async (username, password, email, lastName, firstName) => {
        try {
          set({ loading: true });

          await authService.signUp(
            username,
            password,
            email,
            lastName,
            firstName,
          );

          toast.success(
            "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập",
          );
        } catch (error) {
          console.error(error);
          toast.error("Đăng ký không thành công");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (username, password) => {
        try {
          get().clearState();
          set({ loading: true });

          const { accessToken } = await authService.signIn(username, password);

          get().setAccessToken(accessToken);

          await get().fetchMe();
          useChatStore.getState().fetchConversations();

          toast.success(
            "Đăng nhập thành công! Bạn sẽ được chuyển sang trang chính",
          );
        } catch (error) {
          console.error(error);
          toast.error("Đăng nhập không thành công");
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          set({ loading: true });
          get().clearState();
          await authService.signOut();
          toast.success(
            "Đăng xuất thành công! Bạn sẽ được chuyển sang trang đăng nhập",
          );
        } catch (error) {
          console.error(error);
          toast.error("Đăng xuất không thành công");
        } finally {
          set({ loading: false });
        }
      },

      fetchMe: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchMe();
          set({ user });
          toast.success("Tải thông tin người dùng thành công");
        } catch (error) {
          console.error(error);
          set({ user: null, accessToken: null });
          toast.error("Tải thông tin người dùng không thành công");
        } finally {
          set({ loading: false });
        }
      },

      refresh: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe, setAccessToken } = get();
          const accessToken = await authService.refresh();

          setAccessToken(accessToken);

          if (!user) {
            await fetchMe();
          }
        } catch (error) {
          console.error(error);
          get().clearState();
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // chỉ persist user
    },
  ),
);
