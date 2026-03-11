import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../services/authService";
import { setAuthUser } from "../store/authSlice";

/* ─────────────────────────────────────────────
   Tiny reusable sub-components (all inline)
───────────────────────────────────────────── */

function AlertBanner({ message, type = "error" }) {
  if (!message) return null;
  const isError = type === "error";
  return (
    <div style={{
      padding: "10px 14px",
      borderRadius: "10px",
      fontSize: "13.5px",
      fontWeight: 500,
      marginBottom: "16px",
      backgroundColor: isError ? "#fef2f2" : "#f0fdf4",
      color: isError ? "#b91c1c" : "#15803d",
      border: `1px solid ${isError ? "#fecaca" : "#bbf7d0"}`,
      lineHeight: 1.5,
    }}>
      {message}
    </div>
  );
}

function PasswordField({ id, label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={id} style={styles.label}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          minLength={6}
          style={{ ...styles.input, paddingRight: "44px" }}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          style={styles.eyeBtn}
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sign In Form
───────────────────────────────────────────── */
function SignInForm({ onSuccess }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const dispatch                = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!email.trim()) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(email.trim())) return setError("Please enter a valid email address.");
    if (!password) return setError("Password is required.");

    setLoading(true);
    try {
      const data = await authService.login(email.trim(), password);
      dispatch(setAuthUser(data.user));
      onSuccess();
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AlertBanner message={error} />

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="si-email" style={styles.label}>Email Address</label>
        <input
          id="si-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={styles.input}
        />
      </div>

      <PasswordField
        id="si-password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <button type="submit" disabled={loading} style={loading ? styles.btnDisabled : styles.btn}>
        {loading ? <><span style={styles.spinner} /> Signing In...</> : "Sign In"}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Sign Up Form
───────────────────────────────────────────── */
function SignUpForm({ onSuccess }) {
  const [name, setName]                     = useState("");
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole]                     = useState("customer");
  const [error, setError]                   = useState("");
  const [loading, setLoading]               = useState(false);
  const dispatch                            = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!name.trim())                          return setError("Full name is required.");
    if (!email.trim())                         return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(email.trim()))   return setError("Please enter a valid email address.");
    if (password.length < 6)                   return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword)          return setError("Passwords do not match.");
    if (!["customer", "seller"].includes(role)) return setError("Please select a valid role.");

    setLoading(true);
    try {
      const data = await authService.signup(name.trim(), email.trim(), password, role);
      dispatch(setAuthUser(data.user));
      onSuccess();
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map(e => e.msg).join(". "));
      } else {
        setError(err.response?.data?.error || err.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AlertBanner message={error} />

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="su-name" style={styles.label}>Full Name</label>
        <input
          id="su-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="John Doe"
          required
          style={styles.input}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="su-email" style={styles.label}>Email Address</label>
        <input
          id="su-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={styles.input}
        />
      </div>

      <PasswordField
        id="su-password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Create a password (min 6 chars)"
      />

      <PasswordField
        id="su-confirm"
        label="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Repeat password"
      />

      {/* Role Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label style={styles.label}>I am joining as a…</label>
        <div style={{ display: "flex", gap: "12px" }}>
          {[
            { value: "customer", label: "🛍 Customer", sub: "Browse & buy" },
            { value: "seller",   label: "🏪 Seller",   sub: "List & sell" },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setRole(opt.value)}
              style={{
                flex: 1,
                padding: "12px 8px",
                borderRadius: "10px",
                border: role === opt.value ? "2px solid #5355e9" : "2px solid #e5e7eb",
                backgroundColor: role === opt.value ? "#f0f0ff" : "#fff",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.15s",
                fontFamily: "inherit",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: 700, color: role === opt.value ? "#5355e9" : "#333" }}>{opt.label}</div>
              <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <button type="submit" disabled={loading} style={loading ? styles.btnDisabled : styles.btn}>
        {loading ? <><span style={styles.spinner} /> Creating Account...</> : "Create Account"}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Shared Inline Styles
───────────────────────────────────────────── */
const styles = {
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
    letterSpacing: "0.01em",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14.5px",
    color: "#111",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    padding: 0,
  },
  btn: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.2s",
    marginTop: "4px",
  },
  btnDisabled: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "not-allowed",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "4px",
  },
  spinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "auth-spin 0.8s linear infinite",
    flexShrink: 0,
  },
};

/* ─────────────────────────────────────────────
   Main AuthPage Component
───────────────────────────────────────────── */
export default function AuthPage() {
  const navigate         = useNavigate();
  const [searchParams]   = useSearchParams();
  const { isAuthenticated, loading: authLoading } = useSelector(s => s.auth);

  // Read ?mode=signup from URL to pre-select the tab
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState(initialMode);

  // Guard: if already logged in, kick to home
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Update mode if URL param changes
  useEffect(() => {
    setMode(searchParams.get("mode") === "signup" ? "signup" : "signin");
  }, [searchParams]);

  const handleSuccess = () => navigate("/", { replace: true });

  if (authLoading) return null; // avoid flicker while auth state hydrates

  return (
    <div style={{
      minHeight: "calc(100vh - 116px)", // subtract header+footer approx height
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      background: "linear-gradient(135deg, #f8fafc 0%, #e8eaf6 100%)",
    }}>
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        backgroundColor: "#fff",
        minHeight: "540px",
      }}>
        {/* ── Left decorative panel (hidden on mobile) ── */}
        <div className="auth-left-panel" style={{
          flex: "0 0 42%",
          background: "linear-gradient(160deg, #5355e9 0%, #7c3aed 60%, #9333ea 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 40px",
          color: "#fff",
        }}>
          <div style={{ fontSize: "30px", fontWeight: 900, letterSpacing: "-0.5px", marginBottom: "4px" }}>
            StyleHub
          </div>
          <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", opacity: 0.75, marginBottom: "40px" }}>
            Fashion Forward
          </div>
          <h2 style={{ fontSize: "26px", fontWeight: 800, lineHeight: 1.3, marginBottom: "16px" }}>
            {mode === "signin"
              ? "Welcome back to premium fashion."
              : "Discover your style. Join StyleHub."}
          </h2>
          <p style={{ fontSize: "14px", opacity: 0.8, lineHeight: 1.6 }}>
            {mode === "signin"
              ? "Sign in to access your curated wardrobe, saved items, and exclusive deals."
              : "Create your free account. Shop the latest trends or start selling your fashion collection."}
          </p>

          {/* Decorative Orbs */}
          <div style={{
            position: "relative",
            marginTop: "40px",
            height: "120px",
          }}>
            {[
              { size: 80, top: 0, left: 0, opacity: 0.15 },
              { size: 50, top: 20, left: 60, opacity: 0.2 },
              { size: 100, top: -20, left: 90, opacity: 0.1 },
            ].map((orb, i) => (
              <div key={i} style={{
                position: "absolute",
                width: orb.size,
                height: orb.size,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255," + orb.opacity + ")",
                top: orb.top,
                left: orb.left,
              }} />
            ))}
          </div>
        </div>

        {/* ── Right auth card ── */}
        <div style={{
          flex: 1,
          padding: "44px 40px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Brand on mobile only */}
          <div className="auth-mobile-brand" style={{ display: "none", marginBottom: "24px" }}>
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#5355e9" }}>StyleHub</div>
            <div style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#6366f1" }}>Fashion Forward</div>
          </div>

          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#111", marginBottom: "4px" }}>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          <p style={{ fontSize: "13.5px", color: "#6b7280", marginBottom: "24px" }}>
            {mode === "signin"
              ? "Enter your credentials to continue."
              : "Fill in your details — takes less than a minute."}
          </p>

          {/* Toggle Pill */}
          <div style={{
            display: "flex",
            backgroundColor: "#f3f4f6",
            borderRadius: "999px",
            padding: "4px",
            marginBottom: "28px",
            width: "fit-content",
            position: "relative",
          }}>
            {[
              { key: "signin",  label: "Sign In" },
              { key: "signup",  label: "Sign Up" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setMode(tab.key)}
                style={{
                  padding: "8px 22px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  position: "relative",
                  backgroundColor: "transparent",
                  color: mode === tab.key ? "#fff" : "#666",
                  zIndex: 1,
                  transition: "color 0.2s ease",
                }}
              >
                {mode === tab.key && (
                  <motion.div
                    layoutId="auth-toggle-pill"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "#111",
                      borderRadius: "999px",
                      zIndex: -1,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form area with animation */}
          <div style={{ flex: 1, position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "signin" ? 20 : -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {mode === "signin"
                  ? <SignInForm onSuccess={handleSuccess} />
                  : <SignUpForm onSuccess={handleSuccess} />
                }
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mode switcher footer */}
          <p style={{ fontSize: "13px", color: "#6b7280", textAlign: "center", marginTop: "20px" }}>
            {mode === "signin" ? (
              <>Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  style={{ background: "none", border: "none", color: "#5355e9", fontWeight: 700, cursor: "pointer", fontSize: "13px", padding: 0, fontFamily: "inherit" }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  style={{ background: "none", border: "none", color: "#5355e9", fontWeight: 700, cursor: "pointer", fontSize: "13px", padding: 0, fontFamily: "inherit" }}
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Inline keyframes since Tailwind isn't reliable */}
      <style>{`
        @keyframes auth-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .auth-left-panel { display: none !important; }
          .auth-mobile-brand { display: block !important; }
        }
        /* Input focus ring */
        input:focus {
          border-color: #5355e9 !important;
          box-shadow: 0 0 0 3px rgba(83, 85, 233, 0.12) !important;
        }
      `}</style>
    </div>
  );
}
