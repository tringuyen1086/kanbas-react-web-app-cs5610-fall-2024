import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./KanbasNavigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";
import * as db from "./Database";
import { useState } from "react";
// import store from "./store";
// import { Provider } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";
import Session from "./Account/Session";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>(db.courses);
    const [course, setCourse] = useState<any>({
        _id: "1234", 
        name: "New Course", 
        number: "New Number",
        startDate: "2023-09-10", 
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg", 
        description: "New Description"
    });

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const currentUserRole = currentUser?.role;

    const addNewCourse = () => {
        const newCourse = { ...course, _id: new Date().getTime().toString() };
        setCourses([...courses, { ...course, ...newCourse }]);
    };

    const deleteCourse = (courseId: any) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = () => {
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
    );
};
    
    return (
        // <Provider store={store}>
            <Session>
                <div id="wd-kanbas">
                    <KanbasNavigation />
                    <div className="wd-main-content-offset p-3">
                        <Routes>
                            <Route path="/" element={<Navigate to="Account" />} />
                            <Route path="/Account/*" element={<Account />} />
                            <Route 
                                path="/Dashboard" 
                                element={
                                    <ProtectedRoute>
                                        <Dashboard
                                            courses={courses}
                                            course={course}
                                            setCourses={setCourses}
                                            setCourse={setCourse}
                                            addNewCourse={addNewCourse}
                                            deleteCourse={deleteCourse}
                                            updateCourse={updateCourse} 
                                            currentUserRole={currentUserRole}/> {/* Pass the role to Dashboard */}
                                    </ProtectedRoute> } />                
                            <Route 
                                path="/Courses/:cid/*" 
                                element={ 
                                    <ProtectedRoute> 
                                        <Courses courses={courses} /> 
                                    </ProtectedRoute>} />
                            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                            <Route path="/Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
                </div>
            </Session>
        // </Provider>
    )
}