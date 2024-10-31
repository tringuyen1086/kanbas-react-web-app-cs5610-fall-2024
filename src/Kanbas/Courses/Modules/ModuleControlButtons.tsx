import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs"; // Plus icon
import { FaTrash } from "react-icons/fa";

export default function ModuleControlButtons(
{ moduleId, deleteModule }: { moduleId: string;
    deleteModule: (moduleId: string) => void; } 
) {
    return (
    <div className="d-flex align-items-center justify-content-end gap-3">
        <div className="float-end">
        <FaTrash className="text-danger me-2 mb-1"
                    onClick={() => deleteModule(moduleId)}/>
        <GreenCheckmark />
        <BsPlus className="fs-1" />
        <IoEllipsisVertical className="fs-4" />
        </div>
    </div>
    );
}