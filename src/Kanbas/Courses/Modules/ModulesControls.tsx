import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";

export default function ModulesControls({ 
    moduleName, 
    setModuleName, 
    addModule 
}: { 
    moduleName: string; 
    setModuleName: (title: string) => void; 
    addModule: () => void; 
}) {

    // Access the current user's role from Redux
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            {/* Add Module and Publish Controls - Faculty Only */}
            {currentUser?.role === "FACULTY" && (
                <>
                    <button 
                        className="btn btn-lg btn-danger me-1 float-end"
                        id="wd-add-module-btn" 
                        data-bs-toggle="modal" 
                        data-bs-target="#wd-add-module-dialog" >
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Module
                    </button>
                    <div className="dropdown d-inline me-1 float-end">
                        <button 
                            className="btn btn-lg btn-secondary dropdown-toggle"
                            id="wd-publish-all-btn" 
                            type="button" 
                            data-bs-toggle="dropdown">
                            <GreenCheckmark />
                            Publish All
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a 
                                    className="dropdown-item" 
                                    id="wd-publish-all-modules-and-items-btn" 
                                    href="#">
                                    <GreenCheckmark />
                                    Publish all modules and items
                                </a>
                            </li>

                            <li>
                                <a 
                                    className="dropdown-item" 
                                    id="wd-publish-modules-only-button" 
                                    href="#">
                                    <GreenCheckmark />
                                    Publish modules only
                                </a>
                            </li>

                            {/* Create two more items with IDs wd-unpublish-all-modules-and-items and
                            wd-unpublish-modules-only with labels Unpublish all modules and items
                            and Unpublish modules only */}

                            <li>
                                <a 
                                    className="dropdown-item"
                                    id="wd-unpublish-all-modules-and-items-btn"  
                                    href="#">
                                        <MdDoNotDisturbAlt />
                                        Unpublish all modules and items
                                </a>
                            </li>

                            <li>
                                <a 
                                    className="dropdown-item"
                                    id="wd-unpublish-modules-only-button" 
                                    href="#">
                                        <MdDoNotDisturbAlt />
                                        Unpublish modules only
                                </a>
                            </li>
                        </ul>        
                    </div>
                </>
            )}
        {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}
            <button 
                className="btn btn-lg btn-secondary float-end position-relative me-2"
                id="wd-view-progress" 
                style={{ bottom: "1px" }}>
                View Progress
            </button>

            <button 
                className="btn btn-lg btn-secondary float-end position-relative me-2" 
                id="wd-collapse-all" 
                style={{ bottom: "1px" }}>
                Collapse All
            </button>
            <ModuleEditor 
                dialogTitle="Add Module" 
                moduleName={moduleName}
                setModuleName={setModuleName} 
                addModule={addModule} />
        </div>
    )
;}
