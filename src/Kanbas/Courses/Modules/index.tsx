import React, { useState } from "react";
import { useParams } from "react-router";
import * as db from "../../Database";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { addModule, editModule,updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  
  const { modules } = useSelector(
    (state: any) => state.modulesReducer);
  
  // Access the current user's role
  const { currentUser } = useSelector((state: any) => state.accountReducer); 
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      {/* Only display ModulesControls if the user is FACULTY */}
      {currentUser?.role === "FACULTY" && (
        <ModulesControls 
          moduleName={moduleName} 
          setModuleName={setModuleName} 
          addModule={() => {
            dispatch(addModule({
              name: moduleName, course: cid }));
            setModuleName("");
          }} 
        />
      )}
      <br /><br />
        
      <ul id="wd-modules" className="mt-2 list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li 
            key={module._id}
            className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            {/* Use Flexbox to align content horizontally */}
            <div className="wd-title p-3 ps-2 bg-secondary text-black d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              {/* Module name should take up available space */}
              <span className="flex-grow-1 fw-bold">
                {!module.editing && module.name}
                { module.editing && (
                  <input className="form-control w-50 d-inline-block"
                        onChange={(e) => 
                          dispatch(
                            updateModule({ ...module, name: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(updateModule({ ...module, editing: false }));
                          }
                        }}
                        defaultValue={module.name}
                  />
                )}
              </span>
              
              {/* Display ModuleControlButtons only for FACULTY */}
              {currentUser?.role === "FACULTY" && (
                <ModuleControlButtons 
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>
            
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}        
                      <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
);}