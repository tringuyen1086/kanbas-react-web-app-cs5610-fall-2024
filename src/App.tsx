import React from 'react';
import logo from './logo.svg';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import Github from './Github';

import Assignments from './Kanbas/Courses/Assignments';
import AssignmentEditor from './Kanbas/Courses/Assignments/Editor';
import Modules from './Kanbas/Courses/Modules';
import PeopleTable from './Kanbas/Courses/People/Table';

function App() {
  return (
    <div>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />             {/* default landing page  */}
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Github/*" element={<Github />} />
            <Route path="/Kanbas/*" element={<Kanbas />}>
              {/* Nested Routes for Kanbas */}
              <Route path="Courses/:cid/Assignments" element={<Assignments />} />
              <Route path="Courses/:cid/Assignments/:assignmentId" element={<AssignmentEditor />} />
              <Route path="Courses/:cid/Modules" element={<Modules />} />
              <Route path="Courses/:cid/People" element={<PeopleTable />} />
            </Route>
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
