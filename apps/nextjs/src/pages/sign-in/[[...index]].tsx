import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex flex-col h-[100dvh] items-center content-start pt-20">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);
export default SignInPage;
