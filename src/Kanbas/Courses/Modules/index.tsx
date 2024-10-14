import { useParams } from "react-router";
import * as db from "../../Database"; // Import courses and modules
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";

// Define TypeScript interfaces for Module and Lesson
interface LessonType {
  _id: string;
  name: string;
  description: string;
}
// Reusable Module Component
function Module({ module }: { module: any }) {
  return (
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      {/* Use Flexbox to align content horizontally */}
      <div className="wd-title p-3 ps-2 bg-secondary text-black d-flex align-items-center">
        <BsGripVertical className="me-2 fs-3" />

        {/* Module name should take up available space */}
        <span className="flex-grow-1 fw-bold">{module.name}</span>
        
          {/* Control buttons aligned to the right */}
          <ModuleControlButtons />
</div>

      {/* Render Lessons if Available */}
      {module.lessons && (
        <ul className="wd-lessons list-group rounded-0">
          {module.lessons.map((lesson: LessonType) => (
            <Lesson key={lesson._id} lesson={lesson} />
          ))}
        </ul>
      )}
    </li>
  );
}

// Reusable Lesson Component
function Lesson({ lesson }: { lesson: any }) {
  return (
    <li className="wd-lesson list-group-item p-3 ps-1">
      <BsGripVertical className="me-2 fs-3" />
      {lesson.name}
      <LessonControlButtons />
    </li>
  );
}

export default function Modules() {
  const { cid } = useParams(); // Get the course ID from the URL
  const courseModules = db.modules.filter((module) => module.course === cid); // Filter modules by course ID

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        {courseModules.map((module) => (
          <Module key={module._id} module={module} />
        ))}
      </ul>
    </div>
  );
}


/* 
import ModulesControls from './ModulesControls';
import ModuleControlButtons from './ModuleControlButtons';
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from './LessonControlButtons';

export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">

          <div className="wd-title p-3 ps-2 bg-secondary"> 
            <BsGripVertical className="me-2 fs-3" />
              Week 1
            <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES 
              <LessonControlButtons />
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
              Introduction to the course 
              <LessonControlButtons/>
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
              Learn what is Web Development 
              <LessonControlButtons/>
              </li>

            <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
                LESSON 1 
                <LessonControlButtons/>
                </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
              LESSON 2 
              <LessonControlButtons/>
              </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
            Week 2 
            <ModuleControlButtons/>
            </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES
              <LessonControlButtons /> 
            </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                LESSON 1 
                <LessonControlButtons/>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                LESSON 2 
                <LessonControlButtons/>
              </li>
          </ul>
        </li>
      </ul> 
    </div>
);}
   */