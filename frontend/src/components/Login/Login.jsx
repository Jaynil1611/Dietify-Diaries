import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  return (
    <>
      <div className="login__container">
        <div className="login__box">
          <div className="text--center">
            <h2> Login </h2>
          </div>
          <div className="text--left margin--md">
            <form>
              <div className="login__input-container" role="group">
                <label
                  id="email-label"
                  for="email-input"
                  className="input__container subtitle--sm text--bold"
                >
                  Email
                  <span className="required text--primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email-input"
                  className="login__input"
                  required
                />
              </div>
              <div className="login__input-container" role="group">
                <label
                  id="password-label"
                  for="password-input"
                  className="input__container margin--top subtitle--sm text--bold"
                >
                  Password
                  <span className="required text--primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="password-input"
                  className="login__input"
                  required
                />
                <div className="label--helper body--md">
                  Password should be of 6 characters (including one letter &
                  number)
                </div>
              </div>
              <button className="button--submit subtitle--sm">Sign In</button>
            </form>
            <div className="margin--top spacing--vh text--center">
              New to Dietify
              <Link to="/sigup" className="join-now">
                Join now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
