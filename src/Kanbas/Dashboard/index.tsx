/* 
 * Enrollment now meets all requirements 
 * 1. If the current user's role is Student, 
        they have a blue Enrollments button at the top right of the screen.
 * 2. Clicking the Enrollments button displays all the the courses.
 * 3. Clicking it again only shows the courses a student is enrolled in.
 * 4. Courses that the student is enrolled in should provide a red Unenroll button
 * 5. Courses that the student is not enrolled in should provide a green Enroll button.
 * 6. When a student click's the Unenroll or Enroll button, 
        the enrollment status must actually change 
        and the buttons should toggle to reflect the new state.
 * 7. If a student signs out, and then signs in again, 
        the enrollment choices should still persist.
 * 8. If a user refreshes or reloads the page, the new enrollments are lost.
 * 9. Protect the route to a course 
        so that only students enrolled in that course can navigate to the course, 
        and stay in the Dashboard screen otherwise.
 * 10. All enrollment related buttons should only be visible to students.

*/

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleView, enrollCourse, unenrollCourse, setInitialEnrolledCourses } 
    from "../Dashboard/reducer";
import { User } from "../types";
import * as db from "../Database";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

interface DashboardProps {
    courses: any[];
    course: any;
    setCourses: (courses: any[]) => void;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: any) => void;
    updateCourse: () => void;
    currentUserRole: string;
}

export default function Dashboard({
    courses,
    course,
    setCourses,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    currentUserRole,
}: DashboardProps) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as User | null;
    const showAllCourses = useSelector((state: RootState) => state.enrollments.showAllCourses);
    const enrolledCourses = useSelector((state: RootState) => state.enrollments.enrolledCourses);

    useEffect(() => {
        if (currentUser) {
            const enrolledCoursesIds = db.enrollments
                .filter((enrollment) => enrollment.user === currentUser._id)
                .map((enrollment) => enrollment.course);

            // Initialize enrolled courses from database only if not already populated from local storage
            if (enrolledCourses.length === 0) {
                dispatch(setInitialEnrolledCourses(enrolledCoursesIds));
            }
        }
    }, [currentUser, dispatch, enrolledCourses.length]);

    const handleEnrollToggle = (courseId: string, isEnrolled: boolean) => {
        if (isEnrolled) {
            dispatch(unenrollCourse(courseId));
        } else {
            dispatch(enrollCourse(courseId));
        }
    };

    const visibleCourses = currentUserRole === "STUDENT" && !showAllCourses
        ? courses.filter((course) => enrolledCourses.includes(course._id))
        : courses;

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            {currentUserRole === "FACULTY" && (
                <>
                    <h5>New Course</h5>
                    <Button 
                        variant="primary" 
                        className="float-end" 
                        id="wd-add-new-course-click" 
                        onClick={(e) => {
                            e.preventDefault();
                            addNewCourse();
                            setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
                        }}
                    >
                        Add
                    </Button>
                    <Button 
                        variant="warning" 
                        className="float-end me-2" 
                        id="wd-update-course-click" 
                        onClick={(e) => {
                            e.preventDefault();
                            updateCourse();
                        }}
                    >
                        Update
                    </Button>
                    <br /><br />
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        placeholder="Course Name"
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        placeholder="Course Description"
                    />
                    <hr />
                </>
            )}

            {/* // Enrollments button for Students */}
            {currentUserRole === "STUDENT" && (
                <Button 
                    variant="primary" 
                    className="float-end mb-3" 
                    onClick={() => dispatch(toggleView())}
                >
                    {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
                </Button>
            )}

            <h2 id="wd-dashboard-published">
                {showAllCourses || currentUserRole === "FACULTY" 
                    ? "All Courses" : "My Courses"} ({visibleCourses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {visibleCourses.length > 0 ? (
                        visibleCourses.map((course) => {
                            const isEnrolled = enrolledCourses.includes(course._id);

                            return (
                                <div 
                                    key={course._id} 
                                    className="col d-flex align-items-stretch" 
                                    style={{ width: "300px" }}>
                                    <div className="card rounded-3 overflow-hidden">
                                        <Link 
                                            to={isEnrolled || currentUserRole === "FACULTY" 
                                                ? `/Kanbas/Courses/${course._id}/Home` 
                                                : "#"} 
                                                className="wd-dashboard-course-link text-decoration-none text-dark">
                                            <img
                                                src={`/images/courses/${course.image}`} 
                                                alt={course.name}
                                                width="100%"
                                                height={160}
                                                onError={(e) => {
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
                                                <Button 
                                                    variant="primary" 
                                                    disabled={!isEnrolled && currentUserRole === "STUDENT"}>
                                                    Go
                                                </Button>

                                                {/* Enroll/Unenroll buttons for Students */}
                                                {currentUserRole === "STUDENT" && (
                                                    <Button
                                                        variant={isEnrolled ? "danger" : "success"}
                                                        className="float-end btn-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleEnrollToggle(course._id, isEnrolled);
                                                        }}
                                                    >
                                                        {isEnrolled ? "Unenroll" : "Enroll"}
                                                    </Button>
                                                )}

                                                {/* Edit/Delete buttons for Faculty */}
                                                {currentUserRole === "FACULTY" && (
                                                    <>
                                                        <Button 
                                                            variant="danger" 
                                                            className="float-end btn-sm" 
                                                            id="wd-delete-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                deleteCourse(course._id);
                                                                setCourses(courses.filter((c) => c._id !== course._id));
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button 
                                                            variant="warning" 
                                                            className="float-end btn-sm me-2" 
                                                            id="wd-edit-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setCourse(course);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}


/* 
// Testing for Enroll and UnEnroll Buttons - Working
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleView, enrollCourse, unenrollCourse } from "../Dashboard/reducer";
import { User } from "../types";
import * as db from "../Database";
import { Button } from "react-bootstrap";

interface DashboardProps {
    courses: any[];
    course: any;
    setCourses: (courses: any[]) => void;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: any) => void;
    updateCourse: () => void;
    currentUserRole: string;
}

export default function Dashboard({
    courses,
    course,
    setCourses,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    currentUserRole,
}: DashboardProps) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as User | null;
    const showAllCourses = useSelector((state: RootState) => state.enrollments.showAllCourses);
    const enrolledCourses = useSelector((state: RootState) => state.enrollments.enrolledCourses);

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    // Determine visible courses based on `showAllCourses`
    const visibleCourses = showAllCourses
        ? courses
        : courses.filter((course) => enrolledCourses.includes(course._id));

    // Debugging logs
    console.log("Current User Role:", currentUserRole);
    console.log("All Courses:", courses);
    console.log("Enrolled Courses:", enrolledCourses);
    console.log("Visible Courses:", visibleCourses);
    console.log("Show All Courses State:", showAllCourses);

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            // New Course section visible only to Faculty 
            {currentUserRole === "FACULTY" && (
                <>
                    <h5>New Course</h5>
                    <Button 
                        variant="primary" 
                        className="float-end" 
                        id="wd-add-new-course-click" 
                        onClick={(e) => {
                            e.preventDefault();
                            addNewCourse();
                        }}
                    >
                        Add
                    </Button>
                    <Button 
                        variant="warning" 
                        className="float-end me-2" 
                        id="wd-update-course-click" 
                        onClick={(e) => {
                            e.preventDefault();
                            updateCourse();
                        }}
                    >
                        Update
                    </Button>
                    <br /><br />
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        placeholder="Course Name"
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        placeholder="Course Description"
                    />
                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">
                {showAllCourses ? "All Courses" : "My Courses"} ({visibleCourses.length})
            </h2>

            // Enrollments toggle button for Students
            {currentUserRole === "STUDENT" && (
                <Button 
                    variant="primary" 
                    className="float-end mb-3" 
                    onClick={() => dispatch(toggleView())}
                >
                    {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
                </Button>
            )}
            <hr />

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {visibleCourses.length > 0 ? (
                        visibleCourses.map((course) => {
                            const isEnrolled = enrolledCourses.includes(course._id);

                            return (
                                <div key={course._id} className="col d-flex align-items-stretch" style={{ width: "300px" }}>
                                    <div className="card rounded-3 overflow-hidden">
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                            

                                            <img
                                                src={`/images/courses/${course.image}`} 
                                                alt={course.name}
                                                width="100%"
                                                height={160}
                                                onError={(e) => {
                                                    e.currentTarget.src = "/images/reactjs.jpg";
                                                }}
                                            />
                                            <div className="card-body">
                                                <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                                                <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                    {course.description}
                                                </p>
                                                <Button variant="primary">Go</Button>

                                                // Enrollment Buttons for Students 
                                                {currentUserRole === "STUDENT" && (
                                                    <Button
                                                        variant={isEnrolled ? "danger" : "success"}
                                                        className="float-end btn-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            console.log(isEnrolled ? "Unenroll Button Clicked" : "Enroll Button Clicked");
                                                            isEnrolled 
                                                                ? dispatch(unenrollCourse(course._id)) 
                                                                : dispatch(enrollCourse(course._id));
                                                        }}
                                                    >
                                                        {isEnrolled ? "Unenroll" : "Enroll"}
                                                    </Button>
                                                )}

                                               // Only display Edit and Delete buttons to FACULTY
                                                {currentUserRole === "FACULTY" && (
                                                    <>
                                                        <Button 
                                                            variant="danger" 
                                                            className="float-end btn-sm" 
                                                            id="wd-delete-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                deleteCourse(course._id);
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button 
                                                            variant="warning" 
                                                            className="float-end btn-sm me-2" 
                                                            id="wd-edit-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setCourse(course);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>
            </div>
        </div>
    );
} */

/* 
// Working: Show All Courses for Students. All Courses shown for Faculty with all functional buttons
// Enroll and UnEnroll Button not working yet
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleView, enrollCourse, unenrollCourse } from "../Dashboard/reducer";
import { User } from "../types";
import * as db from "../Database";
import { Button } from "react-bootstrap";

interface DashboardProps {
    courses: any[];
    course: any;
    setCourses: (courses: any[]) => void;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: any) => void;
    updateCourse: () => void;
    currentUserRole: string;
}

export default function Dashboard({
    courses,
    course,
    setCourses,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    currentUserRole,
}: DashboardProps) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as User | null;
    const showAllCourses = useSelector((state: RootState) => state.enrollments.showAllCourses);

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    // Get enrolled courses for the current user
    const enrolledCourses = db.enrollments.filter(
        (enrollment) => enrollment.user === currentUser._id
    );

    const visibleCourses = showAllCourses
        ? courses
        : courses.filter((course) => enrolledCourses.some((enrollment) => enrollment.course === course._id));

    // Debugging and verification logs
    console.log("Current Role:", currentUserRole);
    console.log("All Courses:", courses);
    console.log("Enrolled Courses:", enrolledCourses);
    console.log("Visible Courses:", visibleCourses);
    console.log("showAllCourses State:", showAllCourses);

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />

            // Only display New Course section to FACULTY
            {currentUserRole === "FACULTY" && (
                <>
                    <h5>New Course</h5>
                    <Button 
                        variant="primary" 
                        className="float-end" 
                        id="wd-add-new-course-click" 
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Add New Course Button Clicked");
                            addNewCourse();  // Verify that this function is updating the courses state
                        }}
                    >
                        Add
                    </Button>
                    <Button 
                        variant="warning" 
                        className="float-end me-2" 
                        id="wd-update-course-click" 
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Update Course Button Clicked");
                            updateCourse();  // Ensure this updates the course
                        }}
                    >
                        Update
                    </Button>
                    <br /><br />
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        placeholder="Course Name"
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        placeholder="Course Description"
                    />
                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">
                {showAllCourses ? "All Courses" : "My Courses"} ({visibleCourses.length})
            </h2>

            // Enrollments button for Students
            {currentUserRole === "STUDENT" && (
                <Button 
                    variant="primary" 
                    className="float-end mb-3" 
                    onClick={() => {
                        console.log("Toggle View Button Clicked");
                        dispatch(toggleView());
                    }}
                >
                    {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
                </Button>
            )}
            <hr />

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {visibleCourses.length > 0 ? (
                        visibleCourses.map((course) => {
                            const isEnrolled = enrolledCourses.some(
                                (enrollment) => enrollment.course === course._id
                            );

                            return (
                                <div key={course._id} className="col d-flex align-items-stretch" style={{ width: "300px" }}>
                                    <div className="card rounded-3 overflow-hidden">
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                            // Dynamically load course images
                                            <img
                                                src={`/images/courses/${course.image}`} 
                                                alt={course.name}
                                                width="100%"
                                                height={160}
                                                onError={(e) => {
                                                    e.currentTarget.src = "/images/reactjs.jpg";
                                                }}
                                            />
                                            <div className="card-body">
                                                <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                                                <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                    {course.description}
                                                </p>
                                                <Button variant="primary">Go</Button>

                                                // Enrollment Buttons for Students
                                                {currentUserRole === "STUDENT" && (
                                                    <Button
                                                        variant={isEnrolled ? "danger" : "success"}
                                                        className="float-end btn-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            console.log(isEnrolled ? "Unenroll Button Clicked" : "Enroll Button Clicked");
                                                            isEnrolled 
                                                                ? dispatch(unenrollCourse(course._id)) 
                                                                : dispatch(enrollCourse(course._id));
                                                        }}
                                                    >
                                                        {isEnrolled ? "Unenroll" : "Enroll"}
                                                    </Button>
                                                )}

                                                // Only display Edit and Delete buttons to FACULTY
                                                {currentUserRole === "FACULTY" && (
                                                    <>
                                                        <Button 
                                                            variant="danger" 
                                                            className="float-end btn-sm" 
                                                            id="wd-delete-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                console.log("Delete Course Button Clicked");
                                                                deleteCourse(course._id);
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button 
                                                            variant="warning" 
                                                            className="float-end btn-sm me-2" 
                                                            id="wd-edit-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                console.log("Edit Course Button Clicked");
                                                                setCourse(course);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>
            </div>
        </div>
    );
} */

/* import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleView, enrollCourse, unenrollCourse } from "../Dashboard/reducer";
import { User } from "../types";
import * as db from "../Database";
import { Button } from "react-bootstrap";

interface DashboardProps {
    courses: any[];
    course: any;
    setCourses: (courses: any[]) => void;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: any) => void;
    updateCourse: () => void;
    currentUserRole: string;
}

export default function Dashboard({
    courses,
    course,
    setCourses,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    currentUserRole,
}: DashboardProps) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as User | null;
    const showAllCourses = useSelector((state: RootState) => state.enrollments.showAllCourses);

    // Handle null currentUser case
    if (!currentUser) {
        return <p>Loading...</p>;
    }

    const enrolledCourses = db.enrollments.filter(
        (enrollment) => enrollment.user === currentUser._id
    );

    const visibleCourses = showAllCourses
        ? courses
        : courses.filter((course) => enrolledCourses.some((enrollment) => enrollment.course === course._id));

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <p>Current User Role: {currentUserRole}</p>
            <hr />

            // Only display New Course section to FACULTY
            {currentUserRole === "FACULTY" && (
                <>
                    <h5>New Course</h5>
                    <Button variant="primary" className="float-end" id="wd-add-new-course-click" onClick={addNewCourse}>Add</Button>
                    <Button variant="warning" className="float-end me-2" id="wd-update-course-click" onClick={updateCourse}>Update</Button>
                    <br /><br />
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        placeholder="Course Name"
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        placeholder="Course Description"
                    />
                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">
                {showAllCourses ? "All Courses" : "My Courses"} ({visibleCourses.length})
            </h2>

            // Enrollments button for Students
            {currentUserRole === "STUDENT" && (
                <Button 
                    variant="primary" 
                    className="float-end mb-3" 
                    onClick={() => dispatch(toggleView())}
                >
                    {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
                </Button>
            )}
            <hr />

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {visibleCourses.length > 0 ? (
                        visibleCourses.map((course) => {
                            const isEnrolled = enrolledCourses.some(
                                (enrollment) => enrollment.course === course._id
                            );

                            return (
                                <div key={course._id} className="col d-flex align-items-stretch" style={{ width: "300px" }}>
                                    <div className="card rounded-3 overflow-hidden">
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                            //Dynamically load course images
                                            <img
                                                src={`/images/courses/${course.image}`} 
                                                alt={course.name}
                                                width="100%"
                                                height={160}
                                                onError={(e) => {
                                                    e.currentTarget.src = "/images/reactjs.jpg";
                                                }}
                                            />
                                            <div className="card-body">
                                                <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                                                <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                    {course.description}
                                                </p>
                                                <Button variant="primary">Go</Button>

                                                // Enrollment Buttons for Students 
                                                {currentUserRole === "STUDENT" && (
                                                    <Button
                                                        variant={isEnrolled ? "danger" : "success"}
                                                        className="float-end btn-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            isEnrolled 
                                                                ? dispatch(unenrollCourse(course._id)) 
                                                                : dispatch(enrollCourse(course._id));
                                                        }}
                                                    >
                                                        {isEnrolled ? "Unenroll" : "Enroll"}
                                                    </Button>
                                                )}

                                                // Only display Edit and Delete buttons to FACULTY
                                                {currentUserRole === "FACULTY" && (
                                                    <>
                                                        <Button 
                                                            variant="danger" 
                                                            className="float-end btn-sm" 
                                                            id="wd-delete-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                deleteCourse(course._id);
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button 
                                                            variant="warning" 
                                                            className="float-end btn-sm me-2" 
                                                            id="wd-edit-course-click"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setCourse(course);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>
            </div>
        </div>
    );
} */

/* import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleView, enrollCourse, unenrollCourse } from "../Dashboard/reducer";
import { User } from "../types"; 
import * as db from "../Database";
import { Button } from "react-bootstrap";

interface DashboardProps {
    courses: any[];
    course: any;
    setCourses: (courses: any[]) => void;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: any) => void;
    updateCourse: () => void;
    currentUserRole: string;
}

export default function Dashboard({
    courses,
    course,
    setCourses,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    currentUserRole,
}: DashboardProps) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser) as User | null;
    const showAllCourses = useSelector((state: RootState) => state.enrollments.showAllCourses);

    // Ensure currentUser is not null before rendering sensitive parts
    if (!currentUser) {
        return <p>Loading...</p>;
    }

    const enrolledCourses = db.enrollments.filter(
        (enrollment) => enrollment.user === currentUser._id
    );

    const visibleCourses = showAllCourses
        ? courses
        : courses.filter((course) => enrolledCourses.some((enrollment) => enrollment.course === course._id));

    return (
        <div className="p-4" id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <p>Current User Role: {currentUserRole}</p>
            <hr />

            // Only display New Course section to FACULTY
            {currentUserRole === "FACULTY" && (
                <>
                    <h5>New Course</h5>
                    <Button variant="primary" className="float-end" onClick={addNewCourse}>Add</Button>
                    <Button variant="warning" className="float-end me-2" onClick={updateCourse}>Update</Button>
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                    <hr />
                </>
            )}

            <h2>My Courses ({visibleCourses.length})</h2>
            <Button variant="primary" onClick={() => dispatch(toggleView())}>
                {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
            </Button>
            <hr />

            <div className="course-list">
                {visibleCourses.length > 0 ? (
                    visibleCourses.map((course) => (
                        <div key={course._id} className="course-card">
                            <h5>{course.name}</h5>
                            <p>{course.description}</p>
                            // Enrollment Buttons
                            {currentUserRole === "STUDENT" && (
                                enrolledCourses.some((enrollment) => enrollment.course === course._id) ? (
                                    <Button variant="danger" onClick={() => dispatch(unenrollCourse(course._id))}>
                                        Unenroll
                                    </Button>
                                ) : (
                                    <Button variant="success" onClick={() => dispatch(enrollCourse(course._id))}>
                                        Enroll
                                    </Button>
                                )
                            )}
                        </div>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
} */


/* import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as db from "../Database";
import { toggleEnrollment } from "./enrollmentReducer"; // Import action to toggle enrollment

export default function Dashboard({
  courses,
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
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;

  // State to toggle between showing enrolled courses and all courses
  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleToggleEnrollments = () => {
    setShowAllCourses(!showAllCourses);
  };
  const handleEnrollment = (courseId: string, isEnrolled: boolean) => {
    dispatch(toggleEnrollment({ courseId, userId: currentUser._id, isEnrolled }));
  };

  const enrolledCourses = courses.filter(course =>
    enrollments.some(
      enrollment =>
        enrollment.user === currentUser._id && enrollment.course === course._id
    )
  );

  const visibleCourses = showAllCourses ? courses : enrolledCourses;

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      // Only display New Course section to FACULTY
      {currentUserRole === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />

          <input
            value={course.name}
            className="form-control mb-2"
            onChange={e => setCourse({ ...course, name: e.target.value })}
          />

          <textarea
            value={course.description}
            className="form-control"
            onChange={e => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      //Enrollments button for students
      {currentUserRole === "STUDENT" && (
        <button
          className="btn btn-primary float-end mb-3"
          onClick={handleToggleEnrollments}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {visibleCourses.map((course: any) => {
            const isEnrolled = enrolledCourses.some(
              enrolledCourse => enrolledCourse._id === course._id
            );

            return (
              <div
                key={course._id}
                className="col d-flex align-items-stretch"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    //Dynamically load course images
                    <img
                      src={`/images/courses/${course.image}`}
                      alt={course.name}
                      width="100%"
                      height={160}
                      onError={e => {
                        e.currentTarget.src = "/images/reactjs.jpg";
                      }}
                    />

                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary"> Go </button>

                      // Enrollment buttons for students
                      {currentUserRole === "STUDENT" && (
                        <button
                          className={`btn float-end ${
                            isEnrolled ? "btn-danger" : "btn-success"
                          }`}
                          onClick={() =>
                            handleEnrollment(course._id, isEnrolled)
                          }
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}

                      // Only display Edit and Delete buttons to FACULTY
                      {currentUserRole === "FACULTY" && (
                        <>
                          <button
                            onClick={event => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>

                          <button
                            id="wd-edit-course-click"
                            onClick={event => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} */

/* import { Link } from "react-router-dom";
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
);} */