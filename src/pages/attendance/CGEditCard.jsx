import {useQuery} from "@tanstack/react-query";
import {getAllEventsWithSessionsByEventId} from "@/api/event.js";
import {useEffect, useState} from "react";
import {IconCalendar} from "@arco-design/web-react/icon";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

export default function CGEditCard({connect_group_id, eventID}) {
    const  navigate = useNavigate();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["/getAllEventsWithSessionsByEventId"],
        queryFn: () => getAllEventsWithSessionsByEventId(eventID)
    });

    const [currentEvent, setCurrentEvent] = useState(null);
    const [timeRange, setTimeRange] = useState("");

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        // console.log(data)
        if (data.status) {
            setCurrentEvent(data.data);
            const timeRange = getTimeRange(data.data.session.startAt, data.data.session.endAt);
            setTimeRange(timeRange);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);

    function handleEdit() {
        navigate(`/event/${connect_group_id}/${eventID}`)
    }

    function getTimeRange(startAt, endAt) {


        const date =dayjs(startAt).format('DD MMM YYYY')
        const startTime = dayjs(startAt).format('HH:mm')
        const endTime = dayjs(endAt).format('HH:mm')
        const dayOfWeek = dayjs(startAt).format('ddd')

        return `${date}, ${startTime} - ${endTime} [${dayOfWeek}]`;
    }



    return (
        <div>
            {
                currentEvent && <div
                    className={"flex flex-row items-center justify-between bg-white mb-3 w-full rounded shadow p-4 relative "}
                >
                    <div>
                        <div className={"flex items-center gap-2"}>
                            <IconCalendar style={{color:"#00BA93"}}/>
                            <div className={"text-black font-bold"}>{currentEvent && currentEvent?.event?.name}</div>
                        </div>
                        {
                            timeRange && <div>
                                <div className={"text-gray-400 text-xs"}>{timeRange}</div>
                            </div>
                        }
                    </div>

                    <div className={"text-gray-500 cursor-pointer"} onClick={handleEdit}>
                        Edit
                    </div>

                </div>
            }
        </div>
    )
}