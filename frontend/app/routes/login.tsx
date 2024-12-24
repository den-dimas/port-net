import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import logo from "~/assets/logo-portnet.png";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/hooks/use-toast";
import { useActionData } from "@remix-run/react";
import { FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { loginSessionStorage } from "~/utils/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  const email = form.get("email") as string;
  const password = form.get("password") as string;

  try {
    const data = loginSchema.parse({
      email,
      password,
    });

    if (data.email != "admin@gmail.com") throw new Error("Wrong email");
    if (data.password != "admin123") throw new Error("Wrong password!");

    const session = await loginSessionStorage.getSession(request.headers.get("Cookie"));

    session.set("user", "admin");

    let headers = new Headers({
      "Set-Cookie": await loginSessionStorage.commitSession(session, { expires: new Date(99983090) }),
    });

    return redirect("/dashboard", { headers });
  } catch (error) {
    return error;
  }
}

export default function Login() {
  const { toast } = useToast();
  const error = useActionData<typeof action>();

  useEffect(() => {
    if (!!error) {
      toast({
        title: typeof error == "string" ? error : error + "",
        duration: 4000,
        variant: "destructive",
      });
    }
  }, []);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = await form.trigger();

    if (valid) {
      (e.target as any).submit();
    }
  }

  return (
    <div id="login-page" className="flex w-screen h-screen items-center justify-center">
      <div className="text-sm">
        <img src={logo} className="w-80 mb-12" alt="Auth logo" />

        {/* <CardHeader>
          <CardTitle className="text-6xl font-bold tracking-tighter">Login</CardTitle>

          <CardDescription className="text-dark-purple opacity-70 text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader> */}

        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} method="POST" className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="header text-sm cursor-text">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        {...field}
                        className="border-2 focus:border-orange-main focus:ring-orange-main shadow-none border-black focus-visible:ring-0 h-12 rounded-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="header text-sm cursor-text">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password123..."
                        className="border-2 focus:border-orange-main focus:ring-orange-main shadow-none border-black focus-visible:ring-0 h-12 rounded-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={
                  "rounded-none bg-orange-main text-white font-bold px-2 py-1 relative block z-0 " +
                  "before:absolute before:w-full before:scale-x-0 before:origin-left before:h-full before:top-0 before:left-0 before:bg-black before:block before:-z-10 " +
                  "before:ease-in-out before:duration-200 hover:before:scale-x-100 "
                }
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </div>

      <Toaster />
    </div>
  );
}

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email tidak boleh kosong!",
      invalid_type_error: "Email harus string.",
    })
    .email("Format email salah!")
    .min(5, "Minimal 5 karakter!")
    .max(255, "Email tidak boleh lebih dari 255 karakter!")
    .refine((email) => email.includes("."), {
      message: "Email tidak memiliki domain yang valid!",
    }),

  password: z
    .string({
      required_error: "Password tidak boleh kosong",
      invalid_type_error: "Password harus string.",
    })
    .min(8, "Minimal password adalah 8 karakter!")
    .max(32, "Maksimal password adalah 32 karakter!"),
});

export type LoginForm = z.infer<typeof loginSchema>;

