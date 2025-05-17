import {useNavigate} from "react-router-dom";
import NavBar from "@/components/nav-bar.jsx";

export default function Attendance() {
    const navigate = useNavigate();

    return (
        <div>
            <NavBar ifShowBackArrow={true}>Attendance</NavBar>

        </div>
    )
}