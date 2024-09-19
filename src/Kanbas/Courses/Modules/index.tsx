export default function Modules() {
  const handleCollapseAll = () => {
    // Handle for collapsing all modules
    alert('All modules collapsed');
  };

  const handleViewProgress = () => {
    // Handle for viewing progress
    alert('Viewing progress');
  };

  const handlePublishAll = () => {
    // Handle for publishing all modules
    alert('All modules published');
  };

  const handleAddModule = () => {
    // Handle for adding a new module
    alert('New module added');
  }; 
  
  return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <button onClick={handleCollapseAll}>Collapse All</button>
        <button onClick={handleViewProgress}>View Progress</button>
        <button onClick={handlePublishAll}>Publish all</button>
        <button onClick={handleAddModule}>+ Module</button>

        <ul id="wd-modules">
        {/* Module 1 */}
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to the course 
                </li>
                <li className="wd-content-item">
                  Learn what is Web Development 
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Introduction
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 2 - Creating User Interfaces with HTML
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  <a href="https://docs.google.com/presentation/d/1yb_fQd5MhVuFczb5F5II0CoDkVJALFqxUnuwPAXiOAU/edit#slide=id.g40a3481019_0_0">Introduction to Web Development</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 2 */}
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
  