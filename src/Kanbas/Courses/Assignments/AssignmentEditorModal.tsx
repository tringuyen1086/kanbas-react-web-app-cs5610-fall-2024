import { useState } from "react";

export default function AssignmentEditorModal({
    dialogTitle,
    assignmentName,
    setAssignmentName,
    assignmentDescription,
    setAssignmentDescription,
    assignmentPoints,
    setAssignmentPoints,
    saveAssignment,
}: {
    dialogTitle: string;
    assignmentName: string;
    setAssignmentName: (name: string) => void;
    assignmentDescription: string;
    setAssignmentDescription: (description: string) => void;
    assignmentPoints: number;
    setAssignmentPoints: (points: number) => void;
    saveAssignment: () => void;
}) {
    return (
        <div
            id="wd-add-assignment-dialog"
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{dialogTitle}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <input
                            className="form-control mb-3"
                            value={assignmentName}
                            placeholder="Assignment Name"
                            onChange={(e) => setAssignmentName(e.target.value)}
                        />
                        <textarea
                            className="form-control mb-3"
                            value={assignmentDescription}
                            placeholder="Assignment Description"
                            onChange={(e) => setAssignmentDescription(e.target.value)}
                        />
                        <input
                            className="form-control"
                            type="number"
                            value={assignmentPoints}
                            placeholder="Points"
                            onChange={(e) => setAssignmentPoints(Number(e.target.value))}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveAssignment}
                            type="button"
                            data-bs-dismiss="modal"
                            className="btn btn-danger"
                        >
                            Save Assignment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}