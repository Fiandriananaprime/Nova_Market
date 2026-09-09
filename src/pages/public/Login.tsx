import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ShoppingBag,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button, Input } from "../../components/ui";
import { useApp } from "../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import { LoginRequest } from "../../type/auth";
import { login } from "../../api/auth.api";
import { getApiErrorMessage } from "../../api/errorMessage";
import { useToast } from "../../contexts/ToastContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUserRole } = useApp();
  const { t } = useTranslation();
  const { toast } = useToast();

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError(null);

    if (!form.email.trim() || !form.password.trim()) {
      const message =
        "Veuillez saisir votre email et votre mot de passe.";

      setError(message);
      return;
    }

    setLoading(true);

    try {
      const data = await login(form);

      /**
       * Admin-only portal.
       *
       * Even if the API returns a valid user with another role,
       * this application must not create a session for that role.
       */
      if (data.user.role !== "admin") {
        const message =
          "Accès refusé. Ce portail est réservé aux administrateurs.";

        setError(message);
        toast(message, "error");

        return;
      }

      localStorage.setItem(
        "accessToken",
        data.tokens.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.tokens.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUserRole("admin");

      toast("Connexion réussie.");

      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);

      const message = getApiErrorMessage(
        error,
        "Email ou mot de passe invalide."
      );

      setError(message);
      toast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>

            <span className="font-bold text-xl font-display text-secondary-foreground">
              MasoMarket
            </span>
          </div>

          <h1 className="text-2xl font-bold font-display text-secondary-foreground mb-1">
            {t("Sign in")}
          </h1>

          <p className="text-sm text-muted-foreground">
            {t(
              "Welcome back! Please sign in to continue."
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <Input
                label={t("Email-Adresse-email")}
                type="email"
                name="email"
                placeholder="admin@email.com"
                value={form.email}
                onChange={handleChange}
                icon={
                  <Mail className="w-4 h-4" />
                }
              />

              <Input
                label={t("Password")}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                icon={
                  <Lock className="w-4 h-4" />
                }
                iconRight={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="text-muted-foreground hover:text-secondary-foreground"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
              />
            </div>

            <div className="flex items-center justify-between mt-3 mb-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={handleChange}
                  name="remember"
                  className="w-3.5 h-3.5 rounded border-border text-primary"
                />

                <span className="text-sm text-muted-foreground">
                  {t("Remember me")}
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t("Forgot password?")}
              </Link>
            </div>

            {error && (
              <p
                className="text-sm text-red-500 mt-3 mb-3"
                role="alert"
              >
                {error}
              </p>
            )}

            <Button
              className="w-full"
              size="lg"
              type="submit"
              loading={loading}
            >
              {t("Sign-in-Se-connecter")}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Admin access only
        </p>
      </div>
    </div>
  );
}