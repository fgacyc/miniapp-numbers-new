import {useQuery} from "@tanstack/react-query";
import {getAllEventsWithSessionsByEventId} from "@/api/event.js";
import {useEffect, useState} from "react";
import {IconCalendar} from "@arco-design/web-react/icon";

export default function CGEditCard({eventID}) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["/getAllEventTypes"],
        queryFn: () => getAllEventsWithSessionsByEventId(eventID)
    });

    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        // console.log(data)
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
                            <div className={"text-black font-bold"}>{currentEvent && currentEvent?.event?.name}</div>
                        </div>
                        <div className={"text-gray-500"}>{currentEvent && currentEvent?.session?.startAt}</div>
                        <div className={"text-gray-500"}>{currentEvent && currentEvent?.session?.endAt}</div>
                    </div>

                    <div className={""}>
                        Edit
                    </div>

                </div>
            }
        </div>
    )
}