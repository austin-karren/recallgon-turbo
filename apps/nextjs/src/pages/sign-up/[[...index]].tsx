import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="flex flex-col h-[100dvh] items-center content-start pt-20">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);
export default SignUpPage;
