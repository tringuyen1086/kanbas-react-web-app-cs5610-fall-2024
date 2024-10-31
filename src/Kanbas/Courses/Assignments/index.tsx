import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import { FaPlus, FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useSelector } from "react-redux";
import "./Assignments.css";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );

  // Access the current user's role from Redux
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-assignments">
      <div className="row align-items-center mb-3">
        <div className="col-12 col-md-6">
          <div className="input-group search-box">
            <span className="input-group-text no-border-right search-bg search-icon">
              <BsSearch />
            </span>
            <input
              id="wd-search-assignment"
              type="text"
              className="form-control no-border-left search-input"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
        {currentUser?.role === "FACULTY" && (
          <>
            <button
              id="wd-add-assignment-group"
              className="btn btn-lg btn-light bg-light-darker me-2 border"
            >
              <FaPlus className="me-2" />
              Group
            </button>
            <button id="wd-add-assignment" className="btn btn-lg btn-danger">
              <FaPlus className="me-2" />
              Assignment
            </button>
          </>
        )}
      </div>
    </div>

      <div className="d-flex align-items-center justify-content-between bg-light-darker p-3 ps-2 border">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <div className="dropdown me-2">
            <FaCaretDown />
            <span className="fw-bold">ASSIGNMENTS</span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <button
            id="wd-percentage-assignment"
            className="btn btn-md btn-outline-dark me-2 rounded-pill"
          >
            40% of Total
          </button>
          <FaPlus className="me-2" />
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>

      <div className="border-start border-5 border-success">
        {assignments.length === 0 ? (
          <p className="p-3">No assignments found for this course.</p>
        ) : (
          <ul id="wd-assignment-list" className="list-group rounded-0">
            {assignments.map((assignment) => (
              <li
                key={assignment._id}
                className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex align-items-center"
              >
                <BsGripVertical className="me-2 fs-3" />
                
                {currentUser?.role === "FACULTY" && (
                <MdEditNote className="me-2 fs-4 text-success" />
                )}
                
                <div className="flex-grow-1">
                  {currentUser?.role === "FACULTY" ? (
                  <Link
                    className="wd-assignment-link text-decoration-none text-dark"
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  >
                    {assignment.title}
                  </Link>
                  ) : (
                    <span className="text-dark fw-bold">{assignment.title}</span>
                  )}
                  <p>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong> Not available until</strong> May 6 at 12:00am |{" "}
                    <br />
                    <strong> Due</strong> May 13 at 11:59pm | 100pts
                  </p>
                </div>
                <LessonControlButtons />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* 
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { BsGripVertical } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaPlus } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import "./Assignments.css";

export default function Assignments() {
  const { courseId } = useParams(); // Get courseId from URL params
  const assignments = db.assignments; // Access assignments from the database

  return (
    <div id="wd-assignments">
      // Container for Search and Control Buttons
      <div className="row align-items-center mb-3">
        // Search Box
        <div className="col-12 col-md-6">
          <div className="input-group search-box">
            <span className="input-group-text no-border-right search-bg search-icon">
              <BsSearch />
            </span>
            <input
              id="wd-search-assignment"
              type="text"
              className="form-control no-border-left search-input"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>

        // Buttons
        <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
          <button id="wd-add-assignment-group" className="btn btn-lg btn-light bg-light-darker me-2 border border-1">
            <FaPlus className="me-2" />
            Group
          </button>

          <button id="wd-add-assignment" className="btn btn-lg btn-danger">
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>

      // Assignment list header
      <div className="d-flex align-items-center justify-content-between bg-light-darker p-3 ps-2 border border-1">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <div className="dropdown me-2">
            <FaCaretDown />
            <span className="fw-bold">ASSIGNMENTS</span>
          </div>
        </div>
        
        <div className="d-flex align-items-center">
          <button id="wd-percentage-assignment" className="btn btn-md btn-outline-dark me-2 rounded-pill">
            40% of Total
          </button>
          <FaPlus className="me-2" />
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>

      // Assignment List Container with Green Left Border
      <div className="border-start border-5 border-success">
        <ul id="wd-assignment-list" className="list-group rounded-0">
          {assignments
            .filter((assignment: any) => assignment.course === courseId)
              .map((assignment: any) => (
            <li
              key={assignment._id}
              className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex align-items-center"
            > 
              // Grip Icon and Assignment Title
              <BsGripVertical className="me-2 fs-3" />
              <MdEditNote className="me-2 fs-4 text-success" />
              <div className="flex-grow-1">
                <Link
                  className="wd-assignment-link text-decoration-none text-dark"
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                <p>
                <span className="text-danger">Multiple Modules</span> | {" "}
                <strong> Not available until</strong> May 6 at 12:00am | <br />
                <strong> Due</strong> May 13 at 11:59pm | 100pts
                </p>
              </div>
              // Checkmark and 3 dots
              <LessonControlButtons />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
 */


/* 
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link } from "react-router-dom";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsSearch } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import "./Assignments.css";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      // Container for search and buttons
      <div className="row align-items-center mb-3">
        // Search Box
        <div className="col-12 col-md-6">
          <div className="input-group search-box">
            <span className="input-group-text no-border-right search-bg search-icon">
              <BsSearch />
            </span>
            <input
              id="wd-search-assignment"
              type="text"
              className="form-control no-border-left search-input"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>

        // Buttons
        <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
          <button id="wd-add-assignment-group" className="btn btn-lg btn-light bg-light-darker me-2 border border-1">
            <FaPlus className="me-2" />
            Group
          </button>

          <button id="wd-add-assignment" className="btn btn-lg btn-danger">
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>

      // Assignment list header
      <div className="d-flex align-items-center justify-content-between bg-light-darker p-3 ps-2 border border-1">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <div className="dropdown me-2">
            <FaCaretDown />
            <span className="fw-bold">ASSIGNMENTS</span>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <button id="wd-percentage-assignment" className="btn btn-md btn-outline-dark me-2 rounded-pill">
            40% of Total
          </button>
          <FaPlus className="me-2" />
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>

      //Assignment List Container with Green Left Border
      <div className="border-start border-5 border-success">
        <ul id="wd-assignment-list" className="list-group rounded-0">
          <li className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex align-items-center">
            //Grip Icon and Assignment Title
            <BsGripVertical className="me-2 fs-3" />
            <MdEditNote className="me-2 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link className="wd-assignment-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Assignments/123">
                A1
              </Link>
              <p>
                <span className="text-danger">Multiple Modules</span> | 
                <strong> Not available until</strong> May 6 at 12:00am | <br />
                <strong> Due</strong> May 13 at 11:59pm | 100pts
              </p>
            </div>
            // Checkmark and 3 dots
            <LessonControlButtons />
          </li>

          <li className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex align-items-center">
            // Grip Icon and Assignment Title
            <BsGripVertical className="me-2 fs-3" />
            <MdEditNote className="me-2 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link className="wd-assignment-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Assignments/124">
                A2
              </Link>
              <p>
                <span className="text-danger">Multiple Modules</span> | 
                <strong> Not available until</strong> May 6 at 12:00am | <br />
                <strong> Due</strong> May 13 at 11:59pm | 100pts
              </p>
            </div>
            // Checkmark and 3 dots
            <LessonControlButtons />
          </li>

          <li className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex align-items-center">
            // Grip Icon and Assignment Title
            <BsGripVertical className="me-2 fs-3" />
            <MdEditNote className="me-2 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link className="wd-assignment-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Assignments/125">
                A3
              </Link>
              <p>
                <span className="text-danger">Multiple Modules</span> | 
                <strong> Not available until</strong> May 6 at 12:00am | <br />
                <strong> Due</strong> May 13 at 11:59pm | 100pts
              </p>
            </div>
            <LessonControlButtons />
          </li>
        </ul>
      </div>
    </div>
  );
}
 */