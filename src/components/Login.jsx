import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import { setAuthUser } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      dispatch(setAuthUser(data.user));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="login-container">
        <div className="login-card">
          <div className="login-brand">
            <span className="logo-text">StyleHub</span>
            <span className="logo-tagline">Fashion Forward</span>
          </div>

          <h1 className="login-title">Welcome Back!</h1>
          <p className="login-subtitle">
            Sign in to access your personalized fashion world.
          </p>

          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label" htmlFor="loginEmail">
                Email Address
              </label>
              <input
                className="input-field"
                id="loginEmail"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="loginPassword">
                Password
              </label>
              <input
                className="input-field"
                id="loginPassword"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-actions">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a className="forgot-password" href="#">
                Forgot password?
              </a>
            </div>

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="login-footer">
            New to StyleHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
