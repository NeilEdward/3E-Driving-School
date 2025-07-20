import { AuthForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import logo from "../../assets/icons/3e_1.png";

export const Route = createFileRoute("/__auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            3E Driving School
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm
              title="Create an account"
              description="Enter your email below to create an account"
              buttonLabel="Register"
              showConfirmPassword={true}
              showForgotPassword={false}
              footer={
                <div className="text-slate-700">
                  Already have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Login
                  </a>
                </div>
              }
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-amber-100 lg:block">
        <img
          src={logo}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
