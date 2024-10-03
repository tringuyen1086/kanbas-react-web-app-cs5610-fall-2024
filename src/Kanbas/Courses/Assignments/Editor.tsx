import { Button } from 'react-bootstrap';
import { RxCalendar } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai"; // Icon for the "X" button
import "./Assignments.css"

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment Name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          type="text"
          className="form-control"
          value="A1"
        />
      </div>

      {/* Assignment Description */}
      <div className="mb-3">
        <div className="border p-3">
          <p>
            The assignment is <span className="text-danger">available online</span><br />
            Submit a link to the landing page of your Web application running on Netlify.
          </p>
          <p>
            The landing page should include the following:
            <ul>
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>Link to the Kanbas application</li>
              <li>Links to all relevant source code repositories</li>
            </ul>
          </p>
          <p>The Kanbas application should include a link to navigate back to the landing page.</p>
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-sm-2 col-form-label">Points</label>
        <div className="col-sm-10">
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={100}
          />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="row mb-3">
        <label htmlFor="wd-group" className="col-sm-2 col-form-label">Assignment Group</label>
        <div className="col-sm-10">
          <select className="form-select" id="wd-group">
            <option value="assignments" selected>ASSIGNMENTS</option>
            <option value="quizzes">QUIZZES</option>
            <option value="exams">EXAMS</option>
          </select>
        </div>
      </div>

      {/* Display Grade As */}
      <div className="row mb-3">
        <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label">Display Grade as</label>
        <div className="col-sm-10">
          <select className="form-select" id="wd-display-grade-as">
            <option value="Percentage">Percentage</option>
            <option value="Grade">Grade</option>
          </select>
        </div>
      </div>

      {/* Submission Type and Online Entry Options */}
      <div className="row mb-3">
        <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label">Submission Type</label>
        <div className="col-sm-10">
        <div className="border p-3">
          {/* Added padding (mb-3) below the "Online" dropdown */}
          <select className="form-select mb-3" id="wd-submission-type">
            <option value="Online">Online</option>
          </select>
          
          <label className="form-label fw-bold">Online Entry Options</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-text-entry" />
              <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-website-url" defaultChecked />
              <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
              <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
              <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-file-upload" />
              <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </div>
      </div>

      {/* Assign to Section */}
      <div className="row mb-3">
        <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label">Assign</label>
        <div className="col-sm-10">
          <div className="border p-3">
            <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
            <div className="input-group">
            <div className="form-control d-flex align-items-center" style={{ padding: "0.3rem 0.5rem", border: "1px solid #ced4da" }}>
          <span className="d-flex align-items-center justify-content-between bg-light-darker" style={{ padding: "0.25rem 0.75rem", borderRadius: "0.25rem", fontSize: "0.9rem" }}>
            Everyone
            <AiOutlineClose className="ms-2" style={{ cursor: "pointer", fontSize: "0.85rem" }} />
          </span>
        </div>
      </div>

            {/* Due */}
            <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
            <div className="input-group mb-3">
              <input
                id="wd-due-date"
                className="form-control"
                value="May 13, 2024, 11:59 PM"
              />
              <span className="input-group-text" >
                <RxCalendar />
              </span>
            </div>

            {/* Available from / Until */}
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                <div className="input-group mb-3">
                  <input
                    id="wd-available-from"
                    className="form-control"
                    value="May 6, 2024, 12:00 AM"
                  />
                  <span className="input-group-text" >
                    <RxCalendar />
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <div className="input-group mb-3">
                  <input
                    id="wd-available-until"
                    className="form-control"
                    value=" "
                  />
                  <span className="input-group-text">
                    <RxCalendar />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="light" className="me-2 bg-light-darker">Cancel</Button>
        <Button variant="danger">Save</Button>
      </div>
    </div>
  );
}