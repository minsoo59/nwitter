import React, { useState } from "react";
import { auth as fAuth, join, login } from "fBase";
const AuthForm = () => {
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
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={form.email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create New Account " : "Log in"}
        />
        {form.error && <span className="authError">{form.error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Log in" : "Create Account"}
      </span>
    </>
  );
};
export default AuthForm;
