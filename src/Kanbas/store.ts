import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Dashboard/reducer"; 


const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignments: assignmentsReducer,
        enrollments: enrollmentReducer,  

    },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
