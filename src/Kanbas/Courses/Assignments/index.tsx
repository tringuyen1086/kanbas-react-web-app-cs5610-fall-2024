import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, addAssignment } from "./reducer"; // Importing addAssignment action
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import { FaPlus, FaCaretDown, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Assignments.css";

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const assignments = useSelector((state: any) =>
        state.assignments.assignments.filter((assignment: any) => assignment.course === cid)
    );

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    // State for the new assignment inputs
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [assignmentPoints, setAssignmentPoints] = useState(100);

    const handleDeleteClick = (id: string) => {
        setSelectedAssignmentId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedAssignmentId) {
            dispatch(deleteAssignment(selectedAssignmentId));
        }
        setShowDeleteModal(false);
    };

    const handleSaveAssignment = () => {
        const newAssignment = {
            _id: `${Date.now()}`,
            title: assignmentTitle,
            description: assignmentDescription,
            points: assignmentPoints,
            course: cid!,
            dueDate: new Date().toISOString(),
            availableFrom: new Date().toISOString(),
            availableUntil: new Date().toISOString(),
        };
        dispatch(addAssignment(newAssignment));
        setAssignmentTitle("");
        setAssignmentDescription("");
        setAssignmentPoints(100);
        setShowAddModal(false);
    };

    const formatDateTime = (date: string | null, defaultText: string) => {
        if (!date) return defaultText;
        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        return new Date(date).toLocaleString("en-US", options);
    };

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
                            <button
                                id="wd-add-assignment"
                                className="btn btn-lg btn-danger"
                                onClick={() => setShowAddModal(true)}
                            >
                                <FaPlus className="me-2" />
                                Assignment
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="border-start border-5 border-success">
                {assignments.length === 0 ? (
                    <p className="p-3">No assignments found for this course.</p>
                ) : (
                    <ul id="wd-assignment-list" className="list-group rounded-0">
                        {assignments.map((assignment: any) => (
                            <li
                                key={assignment._id}
                                className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex align-items-center"
                            >
                                <BsGripVertical className="me-2 fs-3" />
                                {currentUser?.role === "FACULTY" && (
                                    <MdEditNote
                                        className="me-2 fs-4 text-success"
                                        onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}/edit`)}
                                        style={{ cursor: "pointer" }}
                                    />
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
                                        <strong> Not available until</strong>{" "}
                                        {formatDateTime(assignment.availableFrom, "May 6, 12:00AM ")} |{" "}
                                        <br />
                                        <strong> Due</strong> {formatDateTime(assignment.dueDate, "May 13, 11:59PM ")} 
                                        | {assignment.points ? assignment.points : "100"} pts
                                    </p>
                                </div>
                                {currentUser?.role === "FACULTY" && (
                                <FaTrash
                                    className="text-danger ms-2 me-2"
                                    onClick={() => handleDeleteClick(assignment._id)}
                                    style={{ cursor: "pointer" }}
                                />
                                )}
                                <LessonControlButtons />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Assignment Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className="form-control mb-3"
                        value={assignmentTitle}
                        placeholder="Assignment Title"
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                    />
                    <textarea
                        className="form-control mb-3"
                        value={assignmentDescription}
                        placeholder="Assignment Description"
                        onChange={(e) => setAssignmentDescription(e.target.value)}
                    />
                    <input
                        className="form-control"
                        type="number"
                        value={assignmentPoints}
                        placeholder="Points"
                        onChange={(e) => setAssignmentPoints(Number(e.target.value))}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSaveAssignment}>
                        Save Assignment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

/* import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignment } from "./reducer";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import { FaPlus, FaCaretDown, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Assignments.css";

export default function Assignments() {
    const { cid } = useParams<{ cid: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    // Access assignments from Redux state for the specific course
    const assignments = useSelector((state: any) => 
        state.assignments.assignments.filter((assignment: any) => assignment.course === cid)
    );

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setSelectedAssignmentId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedAssignmentId) {
            dispatch(deleteAssignment(selectedAssignmentId));
        }
        setShowDeleteModal(false);
    };

    const handleEditClick = (assignment: any) => {
        dispatch(setAssignment(assignment));
        navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}/edit`);
    };

    // Formatting function with fallback for default text if date is missing
    const formatDateTime = (date: string | null, defaultText: string) => {
        if (!date) return defaultText;
        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        return new Date(date).toLocaleString("en-US", options);
    };

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
                            <button
                                id="wd-add-assignment"
                                className="btn btn-lg btn-danger"
                                onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}
                            >
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
                    {currentUser?.role === "FACULTY" && (
                      <>
                    <FaPlus className="me-2" />
                      </>
                    )}
                    <IoEllipsisVertical className="fs-4" />
                </div>
            </div>

            <div className="border-start border-5 border-success">
                {assignments.length === 0 ? (
                    <p className="p-3">No assignments found for this course.</p>
                ) : (
                    <ul id="wd-assignment-list" className="list-group rounded-0">
                        {assignments.map((assignment: any) => (
                            <li
                                key={assignment._id}
                                className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex align-items-center"
                            >
                                <BsGripVertical className="me-2 fs-3" />
                                {currentUser?.role === "FACULTY" && (
                                    <MdEditNote
                                        className="me-2 fs-4 text-success"
                                        onClick={() => handleEditClick(assignment)}
                                        style={{ cursor: "pointer" }}
                                    />
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
                                        <strong> Not available until</strong>{" "}
                                        {formatDateTime(assignment.availableFrom, "May 6, 12:00AM ")} |{" "}
                                        <br />
                                        <strong> Due</strong> {formatDateTime(assignment.dueDate, "May 13, 11:59PM ")} 
                                          | {assignment.points ? assignment.points : "100"} pts
                                    </p>
                                </div>
                                {currentUser?.role === "FACULTY" && (
                                <FaTrash
                                    className="text-danger ms-2 me-2"
                                    onClick={() => handleDeleteClick(assignment._id)}
                                    style={{ cursor: "pointer" }}
                                />
                                )}
                                <LessonControlButtons />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

           //Delete Confirmation Modal
            
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
} */

/* import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import { FaPlus, FaCaretDown, FaTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Assignments.css";

export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState(
    db.assignments.filter((assignment) => assignment.course === cid)
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleDelete = () => {
    if (assignmentToDelete) {
      setAssignments((prevAssignments) =>
        prevAssignments.filter((a) => a._id !== assignmentToDelete)
      );

      // Update the database or external state as needed
      db.assignments = db.assignments.filter((a) => a._id !== assignmentToDelete);

      // Clear assignmentToDelete to trigger useEffect and close modal
      setAssignmentToDelete(null);
    }
  };

  useEffect(() => {
    // Close the modal whenever assignmentToDelete is null
    if (!assignmentToDelete) {
      setShowDeleteDialog(false);
    }
  }, [assignmentToDelete]);

  const handleOpenDeleteDialog = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

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
                {currentUser?.role === "FACULTY" && (
                <FaTrashAlt
                  className="text-danger fs-5 ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenDeleteDialog(assignment._id)}
                />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      // Delete Confirmation Modal
      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} */

/* import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import { FaPlus, FaCaretDown, FaTrashAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Assignments.css";

export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState(
    db.assignments.filter((assignment) => assignment.course === cid)
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleDelete = () => {
    if (assignmentToDelete) {
      setAssignments((prevAssignments) =>
        prevAssignments.filter((a) => a._id !== assignmentToDelete)
      );

      // Update the database or external state as needed
      db.assignments = db.assignments.filter((a) => a._id !== assignmentToDelete);

      // Clear assignmentToDelete to trigger useEffect and close modal
      setAssignmentToDelete(null);
    }
  };

  useEffect(() => {
    // Close the modal whenever assignmentToDelete is null
    if (!assignmentToDelete) {
      setShowDeleteDialog(false);
    }
  }, [assignmentToDelete]);

  const handleOpenDeleteDialog = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

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
                <FaTrashAlt
                  className="text-danger fs-5 ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenDeleteDialog(assignment._id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      // Delete Confirmation Modal
      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} */




/* import { useParams, Link } from "react-router-dom";
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
 */
