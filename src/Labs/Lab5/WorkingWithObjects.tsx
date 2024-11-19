import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, 
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", 
        completed: false, 
        score: 0,
    });

    const [module, setModule] = useState({
        id: 100, 
        name: "NodeJS Module",
        description: "Create a NodeJS server with ExpressJS",
        course: "CS5610 - Web Development",
    });

    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
        <h3>Working With Objects</h3>

        {/* Assignment Object */}
        {/* Update Title to "NodeJS Assignment CS5610 2024" and confirm it change on server*/}
        <h4>Modifying Assignment Properties</h4>
        <a id="wd-update-assignment-title"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
            Update Title
        </a>
        <input 
            className="form-control w-75" 
            id="wd-assignment-title"
            defaultValue={assignment.title} 
            onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
            }
        />
        <hr />

        <h4>Modifying Assignment Score</h4>
        <a 
            id="wd-update-assignment-score"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
            Update Score
        </a>
        <input 
            className="form-control w-75" 
            id="wd-assignment-score"
            type="number"
            defaultValue={assignment.score} 
            onChange={(e) =>
                setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })
            }
        />
        <hr />

        <h4>Modifying Assignment Completed Status</h4>
        <a 
            id="wd-update-assignment-completed"
            className="btn btn-primary float-end"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
            Update Completed Status
        </a>
        <input 
            className="form-check-input" 
            id="wd-assignment-completed"
            type="checkbox"
            checked={assignment.completed} 
            onChange={(e) =>
                setAssignment({ ...assignment, completed: e.target.checked})
            }
        />
        <hr />

        <h4>Retrieving Assignment Objects</h4>
        <a id="wd-retrieve-assignments" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment`}>
            Get Assignment
        </a><hr/>

        <h4>Retrieving Assignment Properties (Title)</h4>
        <a id="wd-retrieve-assignment-title" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/title`}>
            Get Title
        </a><hr/>

        <h4>Retrieving Assignment ID</h4>
        <a id="wd-retrieve-assignment-id" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/id`}>
            Get ID
        </a><hr/>

        <h4>Retrieving Assignment Description</h4>
        <a id="wd-retrieve-assignment-description" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/description`}>
            Get Description
        </a><hr/>

        <h4>Retrieving Assignment Due Date</h4>
        <a id="wd-retrieve-assignment-due" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/due`}>
            Get Due Date
        </a><hr/>

        <h4>Retrieving Assignment Completed Status</h4>
        <a id="wd-retrieve-assignment-completed" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/completed`}>
            Get Completed Status
        </a><hr/>
        <h4>Retrieving Assignment Score</h4>
        <a id="wd-retrieve-assignment-score" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/assignment/score`}>
            Get Score
        </a><hr/>

        {/* Module Object */}    
        <h4>Modifying Module Name</h4>
        <a id="wd-update-module-name"
            className="btn btn-primary float-end"
            href={`${MODULE_API_URL}/name/${module.name}`}>
            Update Name
        </a>
        <input 
            className="form-control w-75" 
            id="wd-module-name"
            defaultValue={module.name} 
            onChange={(e) =>
                setModule({ ...module, name: e.target.value })
            }
        />
        <hr />

        <h4>Modifying Module Description</h4>
        <a id="wd-update-module-description"
            className="btn btn-primary float-end"
            href={`${MODULE_API_URL}/description/${module.description}`}>
            Update Description
        </a>
        <input 
            className="form-control w-75" 
            id="wd-module-description"
            defaultValue={module.description} 
            onChange={(e) =>
                setModule({ ...module, description: e.target.value })
            }
        />
        <hr />

        <h4>Retrieving Module ID</h4>
        <a id="wd-retrieve-module-id" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/module/id`}>
            Get Module ID
        </a><hr/>

        <h4>Retrieving Module Name</h4>
        <a id="wd-retrieve-module-name" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/module/name`}>
            Get Module Name
        </a><hr/>

        <h4>Retrieving Module Description</h4>
        <a id="wd-retrieve-module-description" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/module/description`}>
            Get Module Description
        </a><hr/>

        <h4>Retrieving Module Course</h4>
        <a id="wd-retrieve-module-course" className="btn btn-primary"
            href={`${REMOTE_SERVER}/lab5/module/course`}>
            Get Module Course
        </a><hr/>

    </div>
);}
