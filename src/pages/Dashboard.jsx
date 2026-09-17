function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "0",
      description: "Registered students",
      icon: "bi bi-people-fill",
      color: "primary",
    },
    {
      title: "Total Courses",
      value: "0",
      description: "Available courses",
      icon: "bi bi-book-fill",
      color: "success",
    },
    {
      title: "Active Students",
      value: "0",
      description: "Currently active",
      icon: "bi bi-person-check-fill",
      color: "warning",
    },
    {
      title: "Total Revenue",
      value: "₹0",
      description: "Course fees",
      icon: "bi bi-currency-rupee",
      color: "info",
    },
  ];

  return (
    <div>

      {/* Welcome */}
      <div className="mb-4">

        <h4 className="fw-bold mb-1">
          Welcome back, Admin 👋
        </h4>

        <p className="text-secondary mb-0 small">
          Here's what's happening with your student management system.
        </p>

      </div>

      {/* Statistics */}
      <div className="row g-3 g-md-4 mb-4">

        {stats.map((stat) => (
          <div
            className="col-12 col-sm-6 col-xl-3"
            key={stat.title}
          >

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-3 p-md-4">

                <div className="d-flex justify-content-between align-items-start mb-3">

                  <div
                    className={`bg-${stat.color} bg-opacity-10 text-${stat.color} rounded-3 d-flex align-items-center justify-content-center`}
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <i className={`${stat.icon} fs-5`}></i>
                  </div>

                  <span className="badge text-bg-success">
                    +0%
                  </span>

                </div>

                <h3 className="fw-bold mb-1">
                  {stat.value}
                </h3>

                <p className="text-secondary small mb-0">
                  {stat.description}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Dashboard Cards */}
      <div className="row g-3 g-md-4">

        {/* Students */}
        <div className="col-12 col-xl-8">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-center">

                <h6 className="fw-bold mb-0">
                  Recent Students
                </h6>

                <button className="btn btn-sm btn-outline-primary">
                  View All
                </button>

              </div>

            </div>

            <div className="card-body">

              <div className="text-center py-5">

                <div className="text-secondary mb-3">
                  <i className="bi bi-people fs-1"></i>
                </div>

                <h6 className="fw-semibold">
                  No student data yet
                </h6>

                <p className="text-secondary small mb-0">
                  Student records will appear here.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Courses */}
        <div className="col-12 col-xl-4">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 p-3 p-md-4">

              <div className="d-flex justify-content-between align-items-center">

                <h6 className="fw-bold mb-0">
                  Popular Courses
                </h6>

                <button className="btn btn-sm btn-outline-primary">
                  View All
                </button>

              </div>

            </div>

            <div className="card-body">

              <div className="text-center py-5">

                <div className="text-secondary mb-3">
                  <i className="bi bi-book fs-1"></i>
                </div>

                <h6 className="fw-semibold">
                  No course data yet
                </h6>

                <p className="text-secondary small mb-0">
                  Course information will appear here.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;