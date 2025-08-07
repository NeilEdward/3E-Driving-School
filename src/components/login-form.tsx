import React from "react";
import {useNavigate} from "@tanstack/react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {Input} from "./ui/input";
import {loginSchema, registerSchema} from "@/schema/auth.schema";
import type {LoginFormData, RegisterFormData} from "@/types/auth.types";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {useDispatch} from "react-redux";
import {setUser} from "@/features/auth/user.slice";

interface AuthFormProps extends React.ComponentProps<"form"> {
  title: string;
  description?: string;
  buttonLabel: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  showForgotPassword?: boolean;
  showConfirmPassword?: boolean;
}

export function AuthForm({
  className,
  title,
  description,
  buttonLabel,
  footer,
  children,
  showForgotPassword = false,
  showConfirmPassword = false,
  ...props
}: AuthFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = showConfirmPassword ? registerSchema : loginSchema;
  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: LoginFormData | RegisterFormData) => {
    // data includes email, password, confirmPassword (if registration)
    console.log(data);

    // onLogin(data)
    //   .then((response) => {
    //     if (response.ok)
    //       navigate({
    //         to: "/",
    //       });
    //   })
    //   .catch((error) => {
    //     console.log({ error });
    //   });

    const userResponse = {
      id: "1",
      name: "Neil Edward Dela Cruz Pogi",
      email: data.email,
      role: "admin",
    };

    dispatch(setUser(userResponse));
    localStorage.setItem("user", JSON.stringify(userResponse));

    navigate({
      to: "/dashboard",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-sm text-balance">{description}</p>
          )}
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              {showForgotPassword && (
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              )}
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {showConfirmPassword && (
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {children}
          <Button type="submit" className="w-full">
            {buttonLabel}
          </Button>
        </div>
        {footer}
      </form>
    </Form>
  );
}
