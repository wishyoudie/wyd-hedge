import GoogleButton from "../_components/google-button";
import SignInForm from "../_components/signin-form";

export default async function SignInPage() {
  return (
    <main>
      <div className="grid w-40 gap-2">
        <h1>Sign In</h1>
        <GoogleButton />
        <div>or</div>
        <SignInForm />
      </div>
    </main>
  );
}
