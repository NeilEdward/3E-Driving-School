import { AuthForm } from '@/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return  (
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
    />)
}
