function Courses() {
  return (
    <div>

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

        <div>

          <h5 className="fw-bold mb-1">
            Courses
          </h5>

          <p className="text-secondary small mb-0">
            Manage available courses.
          </p>

        </div>

        <button className="btn btn-primary">

          <i className="bi bi-plus-lg me-2"></i>

          Add Course

        </button>

      </div>

      {/* Courses Table */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>

                  <th className="px-3 px-md-4">
                    #
                  </th>

                  <th>
                    Course Name
                  </th>

                  <th>
                    Duration
                  </th>

                  <th>
                    Fees
                  </th>

                  <th className="text-end px-3 px-md-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-5"
                  >

                    <i className="bi bi-book fs-1 text-secondary"></i>

                    <div className="fw-semibold mt-2">
                      No courses found
                    </div>

                    <small className="text-secondary">
                      Course data from your backend will appear here.
                    </small>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Courses;