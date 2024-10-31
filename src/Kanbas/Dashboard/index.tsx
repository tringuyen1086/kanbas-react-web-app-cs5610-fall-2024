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
    updateCourse 
  }: {
    courses: any[]; 
    course: any; 
    setCourse: (course: any) => void;
    setCourses: (course: any) => void;
    addNewCourse: () => void; 
    deleteCourse: (course: any) => void;
    updateCourse: () => void; })
    {
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>

          <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} 
                    id="wd-update-course-click"> Update </button>
      </h5><br />
      <input value={course.name} className="form-control mb-2" 
              onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea value={course.description} className="form-control"
              onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr />


      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
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
              <div className="col d-flex align-items-stretch" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
              {/* ... {course.name} ... */}

              <Link to={`/Kanbas/Courses/${course._id}/Home`}
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
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>

                    <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
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
                    
                  </div>
                </Link>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
);}

/* 
import { Link } from "react-router-dom";
import * as db from "../Database";
export default function Dashboard() {
  const courses = db.courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  //<img src="/images/reactjs.jpg" alt="" width="100%" height={160} />

                  // Dynamically load course images
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
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
);} */



/* 
  import { Link } from "react-router-dom";
  export default function Dashboard() {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
  
          <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
  
              // Course 1
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5010/Home">
                        <img src="/images/programmingParadigm.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5010 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Programming Paradigm
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 2
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5020/Home">
                        <img src="/images/cybersecurity.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5020 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Cybersecurity Principles
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 3
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5100/Home">
                        <img src="/images/foundationsAI.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5100 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Artificial Intelligence Foundation
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 4
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5130/Home">
                        <img src="/images/systemsecurity.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5130 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Computer System Security
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 5
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5150/Home">
                        <img src="/images/gameAI.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5150 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Game Artificial Intelligence
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 6
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5210/Home">
                        <img src="/images/forensics.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5210 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Information System Forensics
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 7
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5500/Home">
                        <img src="/images/softwareEngineering.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5500 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            System and Software
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 8
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5600/Home">
                        <img src="/images/reactjs.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5600 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            React JS
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 9
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5610/Home">
                        <img src="/images/webDevelopment.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5610 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Web Development
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 10
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5800/Home">
                        <img src="/images/algorithms.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS5800 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Algorithms
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>

              // Course 11
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/6740/Home">
                        <img src="/images/networkSecurity.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS6740 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Network Security
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
              // Course 12 
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to="/Kanbas/Courses/5150/Home">
                        <img src="/images/machineLearning.jpg" alt="" width="100%" height={160}/>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            CS6140 
                          </h5>
                          <p className="wd-dashboard-course-title card-text">
                            Machine Learning
                          </p>
                          <button className="btn btn-primary"> Go </button>
                        </div>
                  </Link>
                </div>
              </div>
  
        </div>
        </div>
      </div>
    );
  }
*/
