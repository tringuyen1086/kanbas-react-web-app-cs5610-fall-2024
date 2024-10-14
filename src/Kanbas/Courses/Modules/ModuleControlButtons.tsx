import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { AiOutlinePlus } from "react-icons/ai"; // Plus icon

export default function ModuleControlButtons() {
    return (
    <div className="d-flex align-items-center justify-content-end gap-3">
        <div className="icon-wrapper">
        <GreenCheckmark />
        </div>
        <div className="icon-wrapper">
        <AiOutlinePlus className="fs-3 text-black" />
        </div>
        <div className="icon-wrapper">
        <IoEllipsisVertical className="fs-4" />
        </div>
    </div>
    );
}