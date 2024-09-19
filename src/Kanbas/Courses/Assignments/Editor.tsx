export default function AssignmentEditor() {
  return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          {/* Points */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>

          {/* Assignments Group with drop boxes for different options */}
          <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-assignment-group">
              <option value="assignments">Assignments</option>
              <option value="quizzes">Quizzes</option>
              <option value="exams">Exams</option>
            </select>
          </td>
        </tr>

        {/* Display Grade as with drop boxes for different options */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade">
              <option value="percentage">Percentage</option>
              <option value="grade">Grade</option>
            </select>
          </td>
        </tr>

        {/* Submission Type with drop boxes for different options */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="online">Online</option>
              <option value="pdf">PDF</option>
            </select>
          </td>
        </tr>

        {/* Online Entry Options with multiple check boxes for different options */}
        <tr>
          <td align="right" valign="top">
            <label>Online Entry Options</label>
          </td>
          <td>
            <input type="checkbox" id="wd-text-entry" /> Text Entry <br />
            <input type="checkbox" id="wd-website-url" /> Website URL <br />
            <input type="checkbox" id="wd-media-recordings" /> Media Recordings <br />
            <input type="checkbox" id="wd-student-annotation" /> Student Annotation <br />
            <input type="checkbox" id="wd-file-uploads" /> File Uploads
          </td>
        </tr>

        {/* Assign to */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
          <td>
          <select id="wd-assign-to">
              <option value="everyone">Everyone</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </td>
        </tr>

        {/* Due */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" />
          </td>
        </tr>

        {/* Available from */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input id="wd-available-from" type="date" />
          </td>
        </tr>

        {/* Until */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Until</label>
          </td>
          <td>
            <input id="wd-available-until" type="date" />
          </td>
        </tr>
        </table>

        {/* Save and Cancel Buttons */}
        <div style={{ marginTop: '20px' }}>
          <button type="submit" onClick={() => alert('Form Saved')}>Save</button>
          <button type="button" onClick={() => alert('Form Cancelled')} style={{ marginRight: '10px' }}>Cancel</button>
        </div>
      </div>
  );}
  