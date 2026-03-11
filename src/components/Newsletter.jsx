import { useState } from "react";
import axios from "axios";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      // Assuming your backend runs on localhost:8080 during dev
      const response = await axios.post("http://localhost:8080/api/subscribe", { email });
      if (response.data.success) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");

        // Reset success state after a few seconds
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ transition: "all 1s ease-in-out" }} className="newsletter-section">
      <div style={{ transition: "all 1s ease-in-out" }} className="newsletter-content">
        <h2 className="newsletter-title">Stay in Style</h2>
        <p className="newsletter-subtitle">
          Subscribe to get the latest fashion updates and exclusive offers
        </p>

        <form style={{ transition: "all 1s ease-in-out" }} className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="newsletter-input"
              required
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="submit"
              style={{ marginLeft: "10px", transition: "all 1s ease-in-out" }}
              className="newsletter-btn"
              disabled={status === "loading" || status === "success" || !email}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>

        {status === "success" && (
          <p className="newsletter-msg success">{message}</p>
        )}
        {status === "error" && (
          <p className="newsletter-msg error">{message}</p>
        )}
      </div>
    </div>
  );
}
