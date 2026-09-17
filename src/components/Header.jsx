import { useState, useEffect } from "react";
import {
  loginUser,
  signupUser,
  logoutUser,
  getUser,
} from "../api/authApi";

// =====================================================
// AUTH MODAL - Popup with Login / Signup forms
// =====================================================
function AuthModal({ show, mode, setMode, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  if (!show) return null;

  const resetForms = () => {
    setError("");
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginUser(loginEmail, loginPassword);
      onSuccess(getUser());
      resetForms();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signupUser(signupName, signupEmail, signupPassword);
      // Auto-login after successful signup
      await loginUser(signupEmail, signupPassword);
      onSuccess(getUser());
      resetForms();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="auth-modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="auth-modal" role="dialog" aria-modal="true">
        <div className="auth-modal-card">

          {/* Header */}
          <div className="auth-modal-header">
            <h5 className="fw-bold mb-0">
              {mode === "login" ? (
                <><i className="bi bi-person-circle me-2"></i>Login</>
              ) : (
                <><i className="bi bi-person-plus me-2"></i>Create Account</>
              )}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => {
                setMode("signup");
                setError("");
              }}
            >
              <i className="bi bi-person-plus me-1"></i>
              Sign Up
            </button>
          </div>

          {/* Body */}
          <div className="auth-modal-body">
            {error && (
              <div className="alert alert-danger py-2 small" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {/* LOGIN FORM */}
            {mode === "login" && (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email address</label>
                  <div className="auth-input-group">
                    <i className="bi bi-envelope auth-input-icon"></i>
                    <input
                      type="email"
                      className="form-control auth-input"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Password</label>
                  <div className="auth-input-group">
                    <i className="bi bi-lock auth-input-icon"></i>
                    <input
                      type="password"
                      className="form-control auth-input"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </>
                  )}
                </button>

                <p className="text-center small text-secondary mt-3 mb-0">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 auth-link"
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                  >
                    Sign up
                  </button>
                </p>
              </form>
            )}

            {/* SIGNUP FORM */}
            {mode === "signup" && (
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Full name</label>
                  <div className="auth-input-group">
                    <i className="bi bi-person auth-input-icon"></i>
                    <input
                      type="text"
                      className="form-control auth-input"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email address</label>
                  <div className="auth-input-group">
                    <i className="bi bi-envelope auth-input-icon"></i>
                    <input
                      type="email"
                      className="form-control auth-input"
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Password</label>
                  <div className="auth-input-group">
                    <i className="bi bi-lock auth-input-icon"></i>
                    <input
                      type="password"
                      className="form-control auth-input"
                      placeholder="Minimum 6 characters"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-check me-2"></i>
                      Create Account
                    </>
                  )}
                </button>

                <p className="text-center small text-secondary mt-3 mb-0">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 auth-link"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

// =====================================================
// HEADER PROFILE DROPDOWN (Login / Sign Up / Logout)
// =====================================================
function ProfileDropdown({ user, onSelectLogin, onSelectSignup, onLogout }) {
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <div className="dropdown">
      {/* Toggle */}
      <div
        className="d-flex align-items-center gap-2 ms-1 dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        role="button"
        style={{ cursor: "pointer" }}
      >
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
          style={{
            width: "38px",
            height: "38px",
          }}
        >
          {userInitial}
        </div>

        <div className="d-none d-md-block">
          <div className="small fw-semibold">
            {user ? user.name : "Guest"}
          </div>

          <small className="text-secondary">
            {user ? user.email : "Not signed in"}
          </small>
        </div>

        <i className="bi bi-chevron-down text-secondary d-none d-md-block"></i>
      </div>

      {/* Menu */}
      <ul className="dropdown-menu dropdown-menu-end shadow profile-dropdown-menu">
        {user ? (
          /* ===== LOGGED IN ===== */
          <>
            <li className="px-3 py-2">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-5 flex-shrink-0"
                  style={{
                    width: "46px",
                    height: "46px",
                  }}
                >
                  {userInitial}
                </div>
                <div className="overflow-hidden">
                  <div className="fw-bold text-truncate">
                    {user.name}
                  </div>
                  <small className="text-secondary text-truncate d-block">
                    {user.email}
                  </small>
                </div>
              </div>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button
                type="button"
                className="dropdown-item d-flex align-items-center gap-2 text-danger"
                onClick={onLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </li>
          </>
        ) : (
          /* ===== NOT LOGGED IN ===== */
          <>
            <li>
              <button
                type="button"
                className="dropdown-item d-flex align-items-center gap-2"
                onClick={onSelectLogin}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </button>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item d-flex align-items-center gap-2"
                onClick={onSelectSignup}
              >
                <i className="bi bi-person-plus"></i>
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

// =====================================================
// HEADER
// =====================================================
function Header({ activePage, setSidebarOpen, user, setUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login");

  useEffect(() => {
    const handleTokenExpired = () => {
      setUser(null);
      setModalMode("login");
      setModalOpen(true);
    };

    window.addEventListener("auth:token-expired", handleTokenExpired);
    return () => window.removeEventListener("auth:token-expired", handleTokenExpired);
  }, [setUser]);

  const openLogin = () => {
    setModalMode("login");
    setModalOpen(true);
  };

  const openSignup = () => {
    setModalMode("signup");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <>
      <header className="bg-white border-bottom">

        <div className="container-fluid px-3 px-md-4 py-3">

          <div className="d-flex align-items-center justify-content-between">

            {/* LEFT */}
            <div className="d-flex align-items-center gap-3">

              {/* Hamburger - tablet/mobile only */}
              <button
                type="button"
                className="btn btn-light d-lg-none"
                onClick={() => setSidebarOpen(true)}
              >
                <i className="bi bi-list fs-5"></i>
              </button>

              <div>

                <h4 className="mb-1 fw-bold text-dark">
                  {activePage}
                </h4>

                <small className="text-secondary d-none d-sm-block">
                  Manage your student information and courses
                </small>

              </div>

            </div>


            {/* RIGHT */}
            <div className="d-flex align-items-center gap-2">

              {/* Notification */}
              <button
                type="button"
                className="btn btn-light position-relative d-none d-sm-inline-flex"
              >

                <i className="bi bi-bell"></i>

                <span
                  className="
                    position-absolute
                    top-0
                    start-100
                    translate-middle
                    bg-danger
                    border
                    border-white
                    rounded-circle
                  "
                  style={{
                    width: "8px",
                    height: "8px",
                  }}
                />

              </button>

              {/* Profile dropdown */}
              <ProfileDropdown
                user={user}
                onSelectLogin={openLogin}
                onSelectSignup={openSignup}
                onLogout={handleLogout}
              />

            </div>

          </div>

        </div>

      </header>

      {/* Auth Modal (popup) */}
      <AuthModal
        show={modalOpen}
        mode={modalMode}
        setMode={setModalMode}
        onClose={closeModal}
        onSuccess={setUser}
      />
    </>
  );
}

export default Header;
