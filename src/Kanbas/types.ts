export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: "FACULTY" | "STUDENT" | "TA";
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}