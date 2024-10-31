import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "../Database";

export default function Dashboard(
  { courses,
    course,
    setCourses, 
    setCourse, 
    addNewCourse,
    deleteCourse, 
    updateCourse,
    currentUserRole,
  }: {
    courses: any[]; 
    course: any; 
    setCourse: (course: any) => void;
    setCourses: (course: any) => void;
    addNewCourse: () => void; 
    deleteCourse: (course: any) => void;
    updateCourse: () => void; 
    currentUserRole: any;
  }) {
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />

      {/* Only display New Course section to FACULTY */}
      {currentUser?.role === "FACULTY" && (
        <>
        <h5>
          New Course
          <button 
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse} > 
            Add 
          </button>

          <button 
            className="btn btn-warning float-end me-2"
            onClick={updateCourse} 
            id="wd-update-course-click"> 
            Update 
          </button>
        </h5>
        <br />
    
        <input 
          value={course.name} 
          className="form-control mb-2" 
          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />

        <textarea 
          value={course.description} 
          className="form-control"
          onChange={(e) => 
            setCourse({ ...course, description: e.target.value }) 
          } 
        />
        <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2> 
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course) =>
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
                ))
            .map((course: any) => (
            // card same size className="col d-flex align-items-stretch"
              <div 
                key={course._id}
                className="col d-flex align-items-stretch" 
                style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link 
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
              {/* <img src="/images/reactjs.jpg" alt="" width="100%" height={160} /> */}

                  {/* Dynamically load course images */}
                  <img
                    src={`/images/courses/${course.image}`} // Use the image field from JSON
                    alt={course.name}
                    width="100%"
                    height={160}
                    onError={(e) => {
                      // Fallback to placeholder if the image fails to load
                      e.currentTarget.src = "/images/reactjs.jpg";
                    }}
                  />

                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p 
                    className="wd-dashboard-course-title card-text overflow-y-hidden" 
                    style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>

                    {/* Only display Edit and Delete buttons to FACULTY */}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button 
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} 
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>

                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </>
                    )} 
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
);}
