import EventCard from "@/components/event-card.jsx";
import {useState} from "react";

export default function EventSection({eventList,setCurrentEvent,setActionSheetVisible}){
    console.log("eventList",eventList)

    const eventStatus = [
        "All",
        "Pending",
        "Completed"
    ]

    const [currentStatus, setCurrentStatus] = useState("All");

    return (
        <>
            <div className={"flex items-center justify-start mb-4 w-full"}>
                {
                    eventStatus.map((status, index) => {
                        return (
                            <div key={index} className={`text-sm cursor-pointer px-3 py-1 rounded-full ml-1 ` +
                                (currentStatus === status ? "bg-[#191D1A] text-white" : "bg-white text-gray-700")}
                                    onClick={() => {
                                        setCurrentStatus(status);
                                    }}
                            >
                                {status}
                            </div>
                        )
                    })
                }
            </div>

            <div className={"w-full"}>
                {
                    eventList.map((event, index) => {
                        return (
                            <EventCard event={event}
                                       setCurrentEvent={setCurrentEvent}
                                       setActionSheetVisible={setActionSheetVisible}
                                       currentStatus={currentStatus}
                                       key={index}/>
                        )
                    })
                }
            </div>
        </>
    )
}