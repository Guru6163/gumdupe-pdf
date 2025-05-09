import Link from "next/link"
import type { Metadata } from "next"
import { SignupForm } from "@/components/signup-form"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Sign Up | GumDupe",
  description: "Create a new GumDupe account",
}

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your details to create a new account</p>
          </div>
          <SignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-brand underline underline-offset-4">
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
