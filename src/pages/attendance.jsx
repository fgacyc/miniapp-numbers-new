import {useNavigate, useParams} from "react-router-dom";
import NavBar from "@/components/nav-bar.jsx";
import {getAllEventsWithSessionsByEventId} from "@/api/event.js";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {IconCalendar} from "@arco-design/web-react/icon";
import {getAllUsers} from "@/api/user.js";
import { Radio,Input  } from '@arco-design/web-react';
const RadioGroup = Radio.Group;


function CGEditCard({eventID}) {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["/getAllEventTypes"],
        queryFn: () => getAllEventsWithSessionsByEventId(eventID)
    });

    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        console.log(data)
        if (data.status) {
            setCurrentEvent(data.data);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);

    return (
        <div>
            {
                currentEvent && <div
                    className={"flex flex-row items-center justify-between bg-white mb-2 w-full rounded-sm shadow-md p-4 relative mt-4"}
                >
                    <div>
                        <div className={"flex items-center gap-2"}>
                            <IconCalendar/>
                            <div className={"text-black font-bold"}>{currentEvent.event.name}</div>
                        </div>
                        <div className={"text-gray-500"}>{currentEvent.session.startAt}</div>
                        <div className={"text-gray-500"}>{currentEvent.session.endAt}</div>
                    </div>

                    <div className={""}>
                        Edit
                    </div>

                </div>
            }
        </div>
    )
}

function CGMemberCard({connect_group_id}) {

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["/getAllUsers"],
        queryFn: () => getAllUsers(connect_group_id)
    });

    const [CGMemberList, setCGMemberList] = useState([]);
    useEffect(() => {
            if (isLoading) return;
            if (isError) return;
            console.log(data)
            if (data.status) {
                setCGMemberList(data.data);
            } else {
                console.log("Error fetching event types");

            }
        }
        , [data]);
    return (
        <div>
            {
                CGMemberList && CGMemberList.map((member, index) => {
                    return (
                        <div key={index} className={"flex flex-col items-center bg-white mb-2 w-full rounded-sm shadow-md p-4 relative"}>

                            <div className={"flex flex-row items-center justify-between w-full"}>
                                <img src={member.avatar_url}
                                     referrerPolicy="no-referrer"
                                     alt="avatar"
                                     className={"w-[50px] h-[50px] rounded-full mr-4"}/>
                                <div className={"w-full"}>
                                    <div className={"flex flex-row items-start justify-between "}>
                                        <div>
                                            <div className={"text-gray-500"}>{member.name}</div>
                                            <div className={"text-gray-500"}>{member.email}</div>
                                        </div>
                                        <RadioGroup defaultValue={"absent"}>
                                            <Radio value='present'></Radio>
                                            <Radio value='absent'
                                                style={{
                                                    borderColor:"FF0000",
                                                    backgroundColor:"FF0000"
                                                }}
                                            ></Radio>
                                        </RadioGroup>

                                    </div>
                                    <Input placeholder='Reason' />
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default function Attendance() {
    const navigate = useNavigate();
    const {eventID} = useParams();

    const connect_group_id = "GUeEXeUO0Evpi5NhkOf3"


    return (
        <div>
            <NavBar ifShowBackArrow={true}>Attendance</NavBar>
            <CGEditCard eventID={eventID}/>
            <CGMemberCard connect_group_id={connect_group_id}/>
        </div>
    )
}