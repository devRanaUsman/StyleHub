import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import { setAuthUser } from "../store/authSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const data = await authService.signup(name, email, password, role);
      dispatch(setAuthUser(data.user));
      navigate("/home");
    } catch (err) {
      if (err.response?.data?.errors) {
         setError(err.response.data.errors.map(e => e.msg).join(", "));
      } else {
         setError(err.response?.data?.error || "Signup failed");
      }
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

          <h1 className="login-title">Create an Account</h1>
          <p className="login-subtitle">
            Join the fashion world to personalized style.
          </p>

          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label" htmlFor="signupName">
                Full Name
              </label>
              <input
                className="input-field"
                id="signupName"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signupEmail">
                Email Address
              </label>
              <input
                className="input-field"
                id="signupEmail"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signupPassword">
                Password
              </label>
              <input
                className="input-field"
                id="signupPassword"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signupConfirmPassword">
                Confirm Password
              </label>
              <input
                className="input-field"
                id="signupConfirmPassword"
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signupRole">
                I am a
              </label>
              <select
                className="input-field bg-white px-3 py-2 border rounded-md"
                id="signupRole"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="customer">Customer (Buy items)</option>
                <option value="seller">Seller (Add items)</option>
              </select>
            </div>

            <button className="login-button mt-4" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="login-footer">
            Already have an account? <Link to="/profile">Sign In</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;
