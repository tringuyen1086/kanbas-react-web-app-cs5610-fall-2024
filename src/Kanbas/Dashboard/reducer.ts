import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Types
export interface Course {
  id: string;
  title: string;
  // Add other course properties as needed
}

interface EnrollmentState {
  enrolledCourses: string[];
  showAllCourses: boolean;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Local Storage Keys
const STORAGE_KEY = 'enrolledCourses';
const LAST_UPDATED_KEY = 'enrolledCoursesLastUpdated';

// Utility functions with error handling
const loadFromStorage = (key: string) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return null;
  }
};

const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
};

// Load initial state with error handling
const loadEnrolledCourses = (): string[] => {
  const saved = loadFromStorage(STORAGE_KEY);
  return Array.isArray(saved) ? saved : [];
};

const loadLastUpdated = (): number | null => {
  return loadFromStorage(LAST_UPDATED_KEY);
};

const initialState: EnrollmentState = {
  enrolledCourses: loadEnrolledCourses(),
  showAllCourses: false,
  isLoading: false,
  error: null,
  lastUpdated: loadLastUpdated(),
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    toggleView(state) {
      state.showAllCourses = !state.showAllCourses;
    },
    
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      state.error = null;
    },
    
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    enrollCourse: {
      reducer(state, action: PayloadAction<string>) {
        if (!state.enrolledCourses.includes(action.payload)) {
          state.enrolledCourses.push(action.payload);
          state.lastUpdated = Date.now();
          
          // Save to localStorage
          const savedCourses = saveToStorage(STORAGE_KEY, state.enrolledCourses);
          const savedTimestamp = saveToStorage(LAST_UPDATED_KEY, state.lastUpdated);
          
          if (!savedCourses || !savedTimestamp) {
            state.error = "Failed to save enrollment to local storage";
          }
        }
      },
      prepare(courseId: string) {
        return {
          payload: courseId,
          meta: { timestamp: Date.now() }
        };
      }
    },
    
    unenrollCourse: {
      reducer(state, action: PayloadAction<string>) {
        state.enrolledCourses = state.enrolledCourses.filter(
          (courseId) => courseId !== action.payload
        );
        state.lastUpdated = Date.now();
        
        // Save to localStorage
        const savedCourses = saveToStorage(STORAGE_KEY, state.enrolledCourses);
        const savedTimestamp = saveToStorage(LAST_UPDATED_KEY, state.lastUpdated);
        
        if (!savedCourses || !savedTimestamp) {
          state.error = "Failed to save enrollment changes to local storage";
        }
      },
      prepare(courseId: string) {
        return {
          payload: courseId,
          meta: { timestamp: Date.now() }
        };
      }
    },
    
    setInitialEnrolledCourses(state, action: PayloadAction<string[]>) {
      state.enrolledCourses = action.payload;
      state.lastUpdated = Date.now();
      
      // Save to localStorage
      const savedCourses = saveToStorage(STORAGE_KEY, state.enrolledCourses);
      const savedTimestamp = saveToStorage(LAST_UPDATED_KEY, state.lastUpdated);
      
      if (!savedCourses || !savedTimestamp) {
        state.error = "Failed to save initial courses to local storage";
      }
    },
    
    clearError(state) {
      state.error = null;
    },
  },
});

// Selectors
export const selectEnrolledCourses = (state: RootState) => 
  state.enrollment.enrolledCourses;

export const selectShowAllCourses = (state: RootState) => 
  state.enrollment.showAllCourses;

export const selectIsLoading = (state: RootState) => 
  state.enrollment.isLoading;

export const selectError = (state: RootState) => 
  state.enrollment.error;

export const selectLastUpdated = (state: RootState) => 
  state.enrollment.lastUpdated;

export const {
  toggleView,
  enrollCourse,
  unenrollCourse,
  setInitialEnrolledCourses,
  setLoading,
  setError,
  clearError,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;

/* import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
export default enrollmentSlice.reducer; */