import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

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
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm text-balance">
            {description}
          </p>
        )}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {showForgotPassword && (
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            )}
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        {showConfirmPassword && (
          <div className="grid gap-3">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
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
  );
}
