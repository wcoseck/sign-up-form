import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function validateForm() {
    setError(null);

    if (username.trim().length < 8) {
      setError("Username must be at least 8 characters long");
      return false;
    }

    if (password.trim().length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.token) {
        setToken(result.token);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  }

  const isSubmitDisabled = !username.trim() || !password.trim() || error;

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />
        </label>

        {}
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </>
  );
}
