import {IconRight} from "@arco-design/web-react/icon";
import dayjs from 'dayjs'


export default function EventCard({ setCurrentEvent, setActionSheetVisible, event,currentStatus }) {
    const date =dayjs(event.session.startAt).format('DD MMM YYYY')
    const startTime = dayjs(event.session.startAt).format('HH:mm')
    const endTime = dayjs(event.session.endAt).format('HH:mm')
    const dayOfWeek = dayjs(event.session.startAt).format('ddd')

    function getIsEventComplete(endTime) {
        const end = dayjs(endTime)
        const now = dayjs()
        return now.isAfter(end)
    }

    const isEventComplete = getIsEventComplete(event.session.endAt)


    function getIsEventDisplayable() {
        if (currentStatus === "All") return true;
        if (currentStatus === "Pending" && !isEventComplete) return true;
        if (currentStatus === "Completed" && isEventComplete) return true;
        return false;
    }


    return (
        <div className={`flex flex-col items-start bg-white mb-2 w-full rounded shadow-sm p-4 relative
                ${getIsEventDisplayable() ? "block" : "hidden" }
        `}
             onClick={() => {
                 setCurrentEvent(event)
                 setActionSheetVisible(true)
             }}
        >
            <div className={"text-black font-semibold"}>{event.event.name}</div>
            <div className={"text-gray-400 text-xs"}>{date}, {startTime} - {endTime} [{dayOfWeek}]</div>

            {
                isEventComplete ? (
                    <div className={"text-[#FEA700] text-sm mt-2"}>Completed</div>
                ) : (
                    <div className={"text-[#00BA93] text-sm mt-2"}>Pending</div>
                )
            }

            <div className={"absolute   top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"}>
                <IconRight/>
            </div>
        </div>
    );
}