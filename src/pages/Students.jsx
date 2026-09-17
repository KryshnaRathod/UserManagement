import { useEffect, useState } from "react";

import {
  getStudents,
  searchStudents,
} from "../api/studentApi";

function Students() {
  // =================================================
  // STATE
  // =================================================

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [gender, setGender] = useState("");

  // Current page
  const [page, setPage] = useState(1);

  // ALWAYS 10 RECORDS PER PAGE
  const limit = 10;

  // Total records from backend
  const [total, setTotal] = useState(0);

  // Total pages from backend
  const [totalPages, setTotalPages] = useState(0);


  // =================================================
  // FETCH STUDENTS
  // =================================================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getStudents({
        page,
        limit,
        gender,
      });

      console.log("Students API response:", result);

      // Students for current page
      setStudents(result.data || []);

      // IMPORTANT:
      // Backend sends pagination inside result.pagination
      setTotal(
        result.pagination?.totalRecords || 0
      );

      setTotalPages(
        result.pagination?.totalPages || 0
      );

    } catch (error) {
      console.error("Fetch students error:", error);

      setError(
        error.message || "Something went wrong"
      );

      setStudents([]);
      setTotal(0);
      setTotalPages(0);

    } finally {
      setLoading(false);
    }
  };


  // =================================================
  // FETCH WHEN PAGE / GENDER CHANGES
  // =================================================

  useEffect(() => {
    fetchStudents();
  }, [page, gender]);


  // =================================================
  // SEARCH
  // =================================================

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Search always starts from page 1
      setPage(1);

      const result = await searchStudents({
        search: search.trim(),
        page: 1,
        limit,
        gender,
      });

      console.log("Search API response:", result);

      setStudents(result.data || []);

      setTotal(
        result.pagination?.totalRecords || 0
      );

      setTotalPages(
        result.pagination?.totalPages || 0
      );

    } catch (error) {
      console.error("Search error:", error);

      setError(
        error.message || "Search failed"
      );

      setStudents([]);
      setTotal(0);
      setTotalPages(0);

    } finally {
      setLoading(false);
    }
  };


  // =================================================
  // GENDER FILTER
  // =================================================

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;

    setGender(selectedGender);

    // Reset to page 1
    setPage(1);
  };


  // =================================================
  // PAGE CHANGE
  // =================================================

  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      return;
    }

    if (newPage > totalPages) {
      return;
    }

    setPage(newPage);

    // Scroll table to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =================================================
  // PAGE NUMBERS
  // SHOW ONLY 10 PAGE BUTTONS AT A TIME
  // =================================================

  const getPageNumbers = () => {
    const pages = [];

    // Example:
    // page 1-10   => 1-10
    // page 11-20  => 11-20
    // page 21-30  => 21-30

    const startPage =
      Math.floor((page - 1) / 10) * 10 + 1;

    const endPage =
      Math.min(
        startPage + 9,
        totalPages
      );

    for (
      let i = startPage;
      i <= endPage;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };


  // =================================================
  // RENDER
  // =================================================

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          d-flex
          flex-column
          flex-md-row
          justify-content-between
          align-items-md-center
          gap-3
          mb-4
        "
      >

        <div>

          <h5 className="fw-bold mb-1">
            Students
          </h5>

          <p className="text-secondary small mb-0">
            Manage all registered students.
          </p>

        </div>


        <button
          type="button"
          className="btn btn-primary"
        >

          <i className="bi bi-plus-lg me-2"></i>

          Add Student

        </button>

      </div>


      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        className="
          card
          border-0
          shadow-sm
          mb-4
        "
      >

        <div className="card-body">

          <form onSubmit={handleSearch}>

            <div className="row g-2">


              {/* Search */}

              <div
                className="
                  col-12
                  col-md-7
                "
              >

                <div className="input-group">

                  <span
                    className="
                      input-group-text
                      bg-white
                    "
                  >

                    <i className="bi bi-search"></i>

                  </span>


                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search name or email..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

              </div>


              {/* Gender */}

              <div
                className="
                  col-12
                  col-md-3
                "
              >

                <select
                  className="form-select"
                  value={gender}
                  onChange={handleGenderChange}
                >

                  <option value="">
                    All Gender
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


              {/* Search button */}

              <div
                className="
                  col-12
                  col-md-2
                "
              >

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >

                  Search

                </button>

              </div>

            </div>

          </form>

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div
          className="alert alert-danger"
          role="alert"
        >

          <i
            className="
              bi
              bi-exclamation-triangle
              me-2
            "
          ></i>

          {error}

        </div>

      )}


      {/* =================================================
          TABLE
      ================================================= */}

      <div
        className="
          card
          border-0
          shadow-sm
        "
      >

        <div className="card-body p-0">

          <div className="table-responsive">

            <table
              className="
                table
                table-hover
                align-middle
                mb-0
              "
            >

              {/* HEADER */}

              <thead className="table-light">

                <tr>

                  <th
                    className="
                      px-3
                      px-md-4
                    "
                  >
                    #
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Gender
                  </th>

                  <th
                    className="
                      text-end
                      px-3
                      px-md-4
                    "
                  >
                    Actions
                  </th>

                </tr>

              </thead>


              {/* BODY */}

              <tbody>


                {/* Loading */}

                {loading && (

                  <tr>

                    <td
                      colSpan="5"
                      className="
                        text-center
                        py-5
                      "
                    >

                      <div
                        className="
                          spinner-border
                          text-primary
                        "
                        role="status"
                      ></div>

                      <div
                        className="
                          text-secondary
                          mt-2
                        "
                      >
                        Loading students...
                      </div>

                    </td>

                  </tr>

                )}


                {/* Empty */}

                {!loading &&
                  students.length === 0 && (

                    <tr>

                      <td
                        colSpan="5"
                        className="
                          text-center
                          py-5
                        "
                      >

                        <i
                          className="
                            bi
                            bi-inbox
                            fs-1
                            text-secondary
                          "
                        ></i>

                        <div
                          className="
                            fw-semibold
                            mt-2
                          "
                        >
                          No students found
                        </div>

                        <small
                          className="
                            text-secondary
                          "
                        >
                          Try changing your
                          search or filter.
                        </small>

                      </td>

                    </tr>

                  )}


                {/* Students */}

                {!loading &&
                  students.map(
                    (student, index) => (

                      <tr
                        key={student._id}
                      >

                        {/* Number */}

                        <td
                          className="
                            px-3
                            px-md-4
                          "
                        >

                          {(page - 1) *
                            limit +
                            index +
                            1}

                        </td>


                        {/* Name */}

                        <td>

                          <div
                            className="
                              fw-semibold
                            "
                          >

                            {student.first_name}{" "}

                            {student.last_name}

                          </div>

                        </td>


                        {/* Email */}

                        <td>

                          <span
                            className="
                              text-secondary
                            "
                          >

                            {student.email}

                          </span>

                        </td>


                        {/* Gender */}

                        <td>

                          <span
                            className={`
                              badge
                              ${
                                student.gender?.toLowerCase() ===
                                "female"
                                  ? "text-bg-danger"
                                  : student.gender?.toLowerCase() ===
                                    "other"
                                  ? "text-bg-warning"
                                  : "text-bg-primary"
                              }
                            `}
                          >

                            {student.gender}

                          </span>

                        </td>


                        {/* Actions */}

                        <td
                          className="
                            text-end
                            px-3
                            px-md-4
                          "
                        >

                          <div
                            className="
                              d-flex
                              justify-content-end
                              gap-2
                            "
                          >

                            <button
                              type="button"
                              className="
                                btn
                                btn-sm
                                btn-outline-primary
                              "
                              title="Edit"
                            >

                              <i
                                className="
                                  bi
                                  bi-pencil
                                "
                              ></i>

                            </button>


                            <button
                              type="button"
                              className="
                                btn
                                btn-sm
                                btn-outline-danger
                              "
                              title="Delete"
                            >

                              <i
                                className="
                                  bi
                                  bi-trash
                                "
                              ></i>

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

              </tbody>

            </table>

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          {!loading &&
            students.length > 0 &&
            totalPages > 0 && (

              <div
                className="
                  p-3
                  border-top
                "
              >

                <div
                  className="
                    d-flex
                    flex-column
                    flex-md-row
                    justify-content-between
                    align-items-center
                    gap-3
                  "
                >


                  {/* TOTAL */}

                  <small
                    className="
                      text-secondary
                    "
                  >

                    Showing{" "}

                    <strong>
                      {(page - 1) *
                        limit +
                        1}
                    </strong>

                    {" "}to{" "}

                    <strong>
                      {Math.min(
                        page * limit,
                        total
                      )}
                    </strong>

                    {" "}of{" "}

                    <strong>
                      {total}
                    </strong>

                    {" "}students

                  </small>


                  {/* PAGINATION */}

                  <nav>

                    <ul
                      className="
                        pagination
                        pagination-sm
                        mb-0
                      "
                    >

                      {/* PREVIOUS */}

                      <li
                        className={`
                          page-item
                          ${
                            page === 1
                              ? "disabled"
                              : ""
                          }
                        `}
                      >

                        <button
                          type="button"
                          className="page-link"
                          disabled={page === 1}
                          onClick={() =>
                            handlePageChange(
                              page - 1
                            )
                          }
                        >
                          Previous
                        </button>

                      </li>


                      {/* PAGE NUMBERS */}

                      {getPageNumbers().map(
                        (pageNumber) => (

                          <li
                            key={pageNumber}
                            className={`
                              page-item
                              ${
                                page ===
                                pageNumber
                                  ? "active"
                                  : ""
                              }
                            `}
                          >

                            <button
                              type="button"
                              className="page-link"
                              onClick={() =>
                                handlePageChange(
                                  pageNumber
                                )
                              }
                            >

                              {pageNumber}

                            </button>

                          </li>

                        )
                      )}


                      {/* NEXT */}

                      <li
                        className={`
                          page-item
                          ${
                            page === totalPages
                              ? "disabled"
                              : ""
                          }
                        `}
                      >

                        <button
                          type="button"
                          className="page-link"
                          disabled={
                            page === totalPages
                          }
                          onClick={() =>
                            handlePageChange(
                              page + 1
                            )
                          }
                        >
                          Next
                        </button>

                      </li>

                    </ul>

                  </nav>

                </div>

              </div>

            )}

        </div>

      </div>

    </div>
  );
}

export default Students;