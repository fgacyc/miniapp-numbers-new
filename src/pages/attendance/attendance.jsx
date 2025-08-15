import {useNavigate, useParams} from "react-router-dom";
import NavBar from "@/components/nav-bar.jsx";
import CGEditCard from "@/pages/attendance/CGEditCard.jsx";

import CGMemberSection from "@/pages/attendance/CGMemberCard.jsx";

export default function Attendance() {
    const navigate = useNavigate();
    const {eventID,session_id,connect_group_id} = useParams();
    // const connect_group_id = "GUeEXeUO0Evpi5NhkOf3"

    return (
        <div className={"h-screen overflow-y-auto"}>
            <NavBar ifShowBackArrow={true}>Attendance</NavBar>
            <div className={"p-4"}>
                <CGEditCard
                    connect_group_id={connect_group_id}
                    eventID={eventID}
                />
                <CGMemberSection
                    connect_group_id={connect_group_id}
                    session_id={session_id}
                />
            </div>

        </div>
    )
}