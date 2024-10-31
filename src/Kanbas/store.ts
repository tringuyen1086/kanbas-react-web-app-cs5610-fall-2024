import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";


const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignments: assignmentsReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
