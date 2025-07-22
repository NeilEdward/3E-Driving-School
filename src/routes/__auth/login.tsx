import { AuthForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthForm
      showForgotPassword
      title="Login to your account"
      description="Enter your email below to login to your account"
      buttonLabel="Login"
      footer={
        <div className="text-slate-700">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      }
    />
  );
}
