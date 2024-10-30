import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
//import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams(); // Get course ID from URL
    const course = courses.find((course: any) => course._id === cid); // Find course by ID
    const { pathname } = useLocation(); // Get current path

    // Extract section name from the path for breadcrumbs
    const section = pathname.split("/")[4] || "Home"; // Default to "Home" if no section

    // Capitalize the first letter of the section for better readability
    // const formattedSection = section.charAt(0).toUpperCase() + section.slice(1);

    return (
        <div id="wd-courses">
        <h2 className="text-danger">
            <FaAlignJustify className="me-3 fs-4 mb-1" />
            {/* {course && course.name} &gt; {formattedSection} */}
            {course && course.name} &gt; {section}
        </h2>
        <hr />
        <div className="d-flex">
            {/* Sidebar Navigation */}
            <div className="d-none d-md-block">
            <CoursesNavigation />
            </div>

            {/* Main Content Area */}
            <div className="flex-fill">
            <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<PeopleTable />} />
            </Routes>
            </div>
        </div>
        </div>
    );
}

/* 
import { courses } from "../Database";
import { Navigate, Route, Routes, useParams } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses() {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} </h2> <hr />
                <div className="d-flex">
                    <div className="d-none d-md-block">
                        <CoursesNavigation />
                    </div>
                    <div className="flex-fill">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules/>} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                            <Route path="People" element={<PeopleTable />} />
                        </Routes>
                    </div>
                </div>
        </div>
    )
} 
*/