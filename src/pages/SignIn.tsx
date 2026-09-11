import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const result = signIn(email, password);

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      setIsSubmitting(false);
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#08090A] px-5 py-8 text-[#F2F2F3]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl border border-[#292A2E] bg-[#111214] lg:grid-cols-2">
          <div className="hidden min-h-[680px] flex-col justify-between border-r border-[#292A2E] p-10 lg:flex">
            <Link
              to="/"
              className="font-[Space_Grotesk] text-xl font-semibold tracking-tight"
            >
              aurora
            </Link>

            <div>
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#292A2E] bg-[#17181A]">
                <Sparkles size={19} className="text-[#7C83FF]" />
              </div>

              <h1 className="max-w-md text-5xl font-semibold leading-[1.05] tracking-[-0.04em]">
                Welcome back.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-[#A6A7AC]">
                Pick up where you left off and keep your money moving with
                intention.
              </p>
            </div>

            <p className="text-sm text-[#6F7076]">
              Your data stays in your browser for this demo.
            </p>
          </div>

          <div className="flex min-h-[680px] items-center p-7 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <Link
                  to="/"
                  className="font-[Space_Grotesk] text-xl font-semibold"
                >
                  aurora
                </Link>
              </div>

              <div className="mb-8">
                <p className="mb-3 text-sm font-medium text-[#7C83FF]">
                  Sign in
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                  Continue to Aurora
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#A6A7AC]">
                  Sign in to access your financial dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="signin-email"
                    className="mb-2 block text-sm text-[#A6A7AC]"
                  >
                    Email
                  </label>

                  <input
                    id="signin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#292A2E] bg-[#0F1012] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#6F7076] focus:border-[#7C83FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signin-password"
                    className="mb-2 block text-sm text-[#A6A7AC]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Your password"
                      className="w-full rounded-xl border border-[#292A2E] bg-[#0F1012] px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-[#6F7076] focus:border-[#7C83FF]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#777B84] transition hover:text-[#F2F2F3]"
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-[#5A3535] bg-[#241718] px-4 py-3 text-sm text-[#D99090]"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2F2F3] px-5 py-3.5 text-sm font-semibold text-[#08090A] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}

                  {!isSubmitting && (
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  )}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#777B84]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[#F2F2F3] transition hover:text-[#7C83FF]"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}