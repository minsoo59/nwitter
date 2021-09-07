import { auth as fAuth, join, login } from "fBase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
const Auth = ({ isLoggedIn }) => {
  const [form, setForm] = useState({ email: "", password: "", error: "" });
  const [newAccount, setNewAccount] = useState(false);
  const onChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) await join(fAuth, form.email, form.password);
      if (!newAccount) await login(fAuth, form.email, form.password);
    } catch (error) {
      setForm({ error: error.message });
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async ({ target: { name } }) => {
    let provider;
    if (name === "google") provider = new GoogleAuthProvider();
    if (name === "github") provider = new GithubAuthProvider();
    await signInWithPopup(fAuth, provider);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={form.email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create New Account " : "Log in"}
        />
        {form.error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log in" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </>
  );
};
export default Auth;
