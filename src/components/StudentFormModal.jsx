import { useState } from "react";

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
};

function StudentFormModal({
  title = "Add Student",
  icon = "bi-person-plus",
  initialValues = EMPTY_FORM,
  saving = false,
  error = "",
  onSubmit,
  onClose,
  submitLabel = "Save Student",
}) {
  const [form, setForm] = useState(() => ({
    first_name: initialValues.first_name || "",
    last_name: initialValues.last_name || "",
    email: initialValues.email || "",
    gender: initialValues.gender || "",
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <>
      <div
        className="auth-modal-backdrop"
        onClick={onClose}
      />

      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
      >
        <div className="auth-modal-card">

          <div className="auth-modal-header">

            <h5 className="fw-bold mb-0">
              <i className={`bi ${icon} me-2`}></i>
              {title}
            </h5>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
              disabled={saving}
            />

          </div>

          <div className="auth-modal-body">

            {error && (
              <div
                className="alert alert-danger py-2 small"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  First name
                </label>
                <div className="auth-input-group">
                  <i className="bi bi-person auth-input-icon"></i>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control auth-input"
                    placeholder="John"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Last name
                </label>
                <div className="auth-input-group">
                  <i className="bi bi-person auth-input-icon"></i>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control auth-input"
                    placeholder="Doe"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Email address
                </label>
                <div className="auth-input-group">
                  <i className="bi bi-envelope auth-input-icon"></i>
                  <input
                    type="email"
                    name="email"
                    className="form-control auth-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">
                  Gender
                </label>
                <select
                  name="gender"
                  className="form-select"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select gender
                  </option>
                  <option value="male">
                    Male
                  </option>
                  <option value="female">
                    Female
                  </option>
                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-light flex-fill"
                  onClick={onClose}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary flex-fill auth-submit-btn"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-2"></i>
                      {submitLabel}
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </>
  );
}

export default StudentFormModal;
