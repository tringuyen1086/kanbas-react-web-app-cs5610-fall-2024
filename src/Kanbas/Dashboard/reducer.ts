import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EnrollmentState {
  enrolledCourses: string[];  // List of course IDs the student is enrolled in
  showAllCourses: boolean;    // Toggle to show all courses or only enrolled courses
}

const initialState: EnrollmentState = {
  enrolledCourses: [],        // Initially, no courses are enrolled
  showAllCourses: false,      // Initially, show only enrolled courses
};

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
      toggleView(state) {
          state.showAllCourses = !state.showAllCourses;
      },
      enrollCourse(state, action: PayloadAction<string>) {
        // Add course ID to enrolledCourses if not already enrolled
          if (!state.enrolledCourses.includes(action.payload)) {
          state.enrolledCourses.push(action.payload);
          }
      },
      unenrollCourse(state, action: PayloadAction<string>) {
        // Remove course ID from enrolledCourses
          state.enrolledCourses = state.enrolledCourses.filter(
          (courseId) => courseId !== action.payload
          );
      },
      setInitialEnrolledCourses(state, action: PayloadAction<string[]>) {
        state.enrolledCourses = action.payload;
      },
    },
});

export const { toggleView, enrollCourse, unenrollCourse, setInitialEnrolledCourses } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;