import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utility function to load enrolled courses from local storage
const loadEnrolledCourses = (): string[] => {
  const saved = localStorage.getItem("enrolledCourses");
  return saved ? JSON.parse(saved) : [];
};

// Utility function to save enrolled courses to local storage
const saveEnrolledCourses = (enrolledCourses: string[]) => {
  localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
};

interface EnrollmentState {
  enrolledCourses: string[];  // List of course IDs the student is enrolled in
  showAllCourses: boolean;    // Toggle to show all courses or only enrolled courses

}

const initialState: EnrollmentState = {
  enrolledCourses: loadEnrolledCourses(), // Load initial state from local storage
  showAllCourses: false,                  // Initially, show only enrolled courses
};

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
      toggleView(state) {
        state.showAllCourses = !state.showAllCourses;
      },
      enrollCourse(state, action: PayloadAction<string>) {
        if (!state.enrolledCourses.includes(action.payload)) {
          state.enrolledCourses.push(action.payload);
          saveEnrolledCourses(state.enrolledCourses); // Save immediately to local storage
        }
      },
      unenrollCourse(state, action: PayloadAction<string>) {
        state.enrolledCourses = state.enrolledCourses.filter(
          (courseId) => courseId !== action.payload
        );
        saveEnrolledCourses(state.enrolledCourses); // Save immediately to local storage
      },
      setInitialEnrolledCourses(state, action: PayloadAction<string[]>) {
        state.enrolledCourses = action.payload;
        saveEnrolledCourses(state.enrolledCourses); // Save initial state to local storage
      },
    },
  });

export const { toggleView, enrollCourse, unenrollCourse, setInitialEnrolledCourses } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;