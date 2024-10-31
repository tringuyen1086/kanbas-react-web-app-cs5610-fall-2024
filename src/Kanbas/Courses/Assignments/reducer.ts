import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import assignmentsData from '../../Database/assignments.json'; 

// Assignment type definition
export interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
}

// Initial state
const initialState = {
    assignments: assignmentsData as Assignment[],
    assignment: {} as Assignment,
};

// Slice definition
const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        addAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignments.push(action.payload);
        },
        deleteAssignment: (state, action: PayloadAction<string>) => {
            state.assignments = state.assignments.filter(a => a._id !== action.payload);
        },
        updateAssignment: (state, action: PayloadAction<Assignment>) => {
            const index = state.assignments.findIndex(a => a._id === action.payload._id);
            if (index !== -1) {
                state.assignments[index] = action.payload;
            }
        },
        setAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignment = action.payload;
        },
    },
});

// Export actions and reducer
export const { addAssignment, deleteAssignment, updateAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;