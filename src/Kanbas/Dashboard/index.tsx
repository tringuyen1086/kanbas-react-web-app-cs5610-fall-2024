import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>       

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <img src="/images/programmingParadigm.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5010 Programming Paradigm
            </Link>
            <p className="wd-dashboard-course-title">
              Core Requirements
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <img src="/images/webDevelopment.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5610 Web Development
            </Link>
            <p className="wd-dashboard-course-title">
            System and Software
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <img src="/images/algorithms.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5800 Algorithms
            </Link>
            <p className="wd-dashboard-course-title">
            Core Requirements
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <img src="/images/softwareEngineering.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5500 Foundations of Software Engineering
            </Link>
            <p className="wd-dashboard-course-title">
              System and Software
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <img src="/images/networkSecurity.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS6740 Network Security
            </Link>
            <p className="wd-dashboard-course-title">
              Theory and Security
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <img src="/images/cybersecurity.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CY5010 Cybersecurity Principles and Practices
            </Link>
            <p className="wd-dashboard-course-title">
              Cybersecurity
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* Course 8 */}
        <div className="wd-dashboard-course">
          <img src="/images/systemsecurity.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5130 Computer System Security
            </Link>
            <p className="wd-dashboard-course-title">
              System Security
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* Course 9 */}
                <div className="wd-dashboard-course">
          <img src="/images/forensics.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5210 Information System Forensics
            </Link>
            <p className="wd-dashboard-course-title">
              Forensics
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

                {/* Course 10 */}
                <div className="wd-dashboard-course">
          <img src="/images/foundationsAI.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5100 Foundations of Artificial Intelligence
            </Link>
            <p className="wd-dashboard-course-title">
            Artificial Intelligence
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

                {/* Course 11 */}
                <div className="wd-dashboard-course">
          <img src="/images/gameAI.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS5150 Game Artificial Intelligence
            </Link>
            <p className="wd-dashboard-course-title">
            Artificial Intelligence
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

                {/* Course 12 */}
                <div className="wd-dashboard-course">
          <img src="/images/machineLearning.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS6140 Machine Learning
            </Link>
            <p className="wd-dashboard-course-title">
              Machine Learning
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
