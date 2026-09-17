function Sidebar({
  activePage,
  sidebarOpen,
  handlePageChange,
  setSidebarOpen,
  user,
  onLogout,
}) {
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";
  const menuItems = [
    {
      name: "Dashboard",
      icon: "bi bi-grid-1x2-fill",
    },
    {
      name: "Students",
      icon: "bi bi-people-fill",
    },
    {
      name: "Courses",
      icon: "bi bi-book-fill",
    },
  ];

  return (
    <>
      {/* =========================
          MOBILE / TABLET OVERLAY
      ========================== */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`
          position-fixed
          top-0
          start-0
          vh-100
          bg-dark
          text-white
          d-flex
          flex-column
          p-3
          ${sidebarOpen ? "d-flex" : "d-none"}
          d-lg-flex
        `}
        style={{
          width: "260px",
          zIndex: 1050,
        }}
      >

        {/* =========================
            LOGO
        ========================== */}
        <div className="d-flex align-items-center gap-2 mb-4">

          <div
            className="rounded-3 bg-primary d-flex align-items-center justify-content-center fw-bold fs-5 flex-shrink-0"
            style={{
              width: "42px",
              height: "42px",
            }}
          >
            S
          </div>

          <div className="flex-grow-1 overflow-hidden">

            <h6 className="mb-0 fw-bold text-truncate">
              StudentHub
            </h6>

            <small className="text-secondary text-nowrap">
              Management System
            </small>

          </div>

          {/* Close button */}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-lg-none"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>

        </div>

        <hr className="border-secondary opacity-25" />

        {/* =========================
            MENU
        ========================== */}
        <div className="flex-grow-1">

          <p className="text-secondary small fw-bold px-2 mb-2">
            MAIN MENU
          </p>

          <div className="d-flex flex-column gap-1">

            {menuItems.map((item) => (

              <button
                key={item.name}
                type="button"
                onClick={() => handlePageChange(item.name)}
                className={`
                  btn
                  border-0
                  text-start
                  d-flex
                  align-items-center
                  gap-3
                  w-100
                  px-3
                  py-2
                  rounded-3
                  ${
                    activePage === item.name
                      ? "btn-primary text-white"
                      : "text-secondary"
                  }
                `}
              >

                <i className={`${item.icon} fs-5`}></i>

                <span className="fw-medium">
                  {item.name}
                </span>

              </button>

            ))}

          </div>

        </div>

        {/* =========================
            ADMIN
        ========================== */}
        <div className="bg-secondary bg-opacity-25 rounded-3 p-2">

          <div className="d-flex align-items-center gap-2">

            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{
                width: "38px",
                height: "38px",
              }}
            >
              {userInitial}
            </div>

            <div className="flex-grow-1 overflow-hidden">

              <div className="small fw-semibold text-truncate">
                {user ? user.name : "Guest"}
              </div>

              <small className="text-secondary text-truncate d-block">
                {user ? user.email : "Not signed in"}
              </small>

            </div>

            {user ? (
              <button
                type="button"
                className="btn btn-sm text-secondary p-1"
                title="Logout"
                onClick={onLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm text-secondary p-1"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            )}

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;