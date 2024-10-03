import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link } from "react-router-dom";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsSearch } from "react-icons/bs";
import "./Search.css";


export default function Assignments() {
    return (
      <div id="wd-assignments">
      {/* Container for search and buttons */}
      <div className="row align-items-center mb-3">
        
        {/* Search Box - Full border around the icon and input */}
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text no-border-right search-bg">
              <BsSearch />
            </span>
            <input
              id="wd-search-assignment"
              type="text"
              className="form-control no-border-left search-bg"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
          <button
            id="wd-add-assignment-group"
            className="btn btn-lg btn-secondary me-2"
          >
            <FaPlus className="me-2" />
            Group
          </button>

          <button
            id="wd-add-assignment"
            className="btn btn-lg btn-danger"
          >
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>

          <br/><br/><br/>

          <ul id="wd-modules" className="list-group rounded-0">
            <li className="wd-assignments-title list-group-item p-0 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">   
                <BsGripVertical className="me-2 fs-3" />
                <div className="dropdown d-inline me-1 float-left">
                <FaCaretDown />
                  ASSIGNMENTS
                </div>
                
                <button id="wd-percentage-assignment" 
                  className="btn btn-md btn-outline-secondary disabled float-right position-relative me-1">
                  40% of Total
                </button>
                <FaPlus/>
                <IoEllipsisVertical className="fs-4" />
              </div>
              </li>

          <ul id="wd-assignment-list" className="list-group rounded-0">
            <li className="wd-assignment-list-item list-group-item p-3 ps-2">
            <BsGripVertical className="me-2 fs-3" />
              <Link className="wd-assignment-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Assignments/123">
                A1
              </Link>
              <p> Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am | <strong> Due</strong> May 13 at 11:59pm | 100pts</p>
              <LessonControlButtons/> 
            </li>

          <li className="wd-assignment-list-item list-group-item p-3 ps-2">
          <BsGripVertical className="me-2 fs-3" />
            <Link className="wd-assignment-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Assignments/123">
              A2
            </Link>
            <p> Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong> Due</strong> May 20 at 11:59pm | 100pts</p>
          
            <LessonControlButtons/> 
          </li>

          <li className="wd-assignment-list-item list-group-item p-3 ps-2">
          <BsGripVertical className="me-2 fs-3" />
            <Link className="wd-assignment-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Assignments/123">
              A3
            </Link>
            <p className="wd-assignment-description"><span>Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am | <strong> Due</strong> May 27 at 11:59pm | 100pts</p>
            <LessonControlButtons/> 
          </li>
      
          </ul>
        </ul>
      </div>
  );}
