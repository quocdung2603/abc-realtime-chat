import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"

// khai báo schema cho form đăng kí
const signUpSchema = z.object({
  firstName: z.string().min(1, "Vui lòng nhập tên của bạn"),
  lastName: z.string().min(1, "Vui lòng nhập họ của bạn"),
  username: z.string().min(3, "Vui lòng nhập tên đăng nhập"),
  email: z.string().min(1, "Vui lòng nhập email của bạn").email("Vui lòng nhập một địa chỉ email hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự")
})

//
type SignUpFormValue = z.infer<typeof signUpSchema>


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormValue>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: SignUpFormValue) => {
    const { username, password, email, lastName, firstName } = data;

    await signUp(username, password, email, lastName, firstName);

    navigate("/signin");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/"
                  className="mx-auto block w-fit text-center"
                >
                  <img
                    src="/logo.svg"
                    className="w-10 h-10"
                    alt="logo"
                  />
                </a>
                <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
                <p className="text-muted-foreground text-balance" >Chào mừng bạn! Hãy đăng kí để bắt đầu</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="block text-sm">Họ</Label>
                  <Input type="text" id="lastName" {...register("lastName")} />
                  {errors.lastName && (
                    <p className="error-message"> {errors.lastName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="block text-sm">Tên</Label>
                  <Input type="text" id="firstName" {...register("firstName")} />
                  {errors.firstName && (
                    <p className="error-message"> {errors.firstName.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm">Tên đăng nhập</Label>
                <Input type="text" id="username" {...register("username")} />
                {errors.username && (
                  <p className="error-message"> {errors.username.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm">Email</Label>
                <Input type="email" id="email" {...register("email")} />
                {errors.email && (
                  <p className="error-message"> {errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm">Mật khẩu</Label>
                <Input type="password" id="password" {...register("password")} />
                {errors.password && (
                  <p className="error-message"> {errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>Tạo tài khoản</Button>

              <div className="text-center text-sm">
                Bạn đã có tài khoản? {" "}
                <a href="/signin" className="underline underline-offset-4 hover:text-primary">Đăng nhập</a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="px-6 text-center *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
        và <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  )
}
