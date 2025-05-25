import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileToken from "@/components/profile-token.jsx";
// import {useUserStore} from "@/store/user-store.js";
// import {useTranslation} from "react-i18next";
//import dayjs from 'dayjs'
// import {DatePicker} from "@arco-design/web-react";
import {ActionSheet, Button} from "antd-mobile";
import {useQuery} from "@tanstack/react-query";
// import {getAllEventTypes} from "@/api/event_type.js";
import {getAllEventsWithSessionsWithCGID} from "@/api/event.js";
import {IconRight} from "@arco-design/web-react/icon";
import CgCard from "@/components/cg-card.jsx";
import AttendRate from "@/components/attend-rate.jsx";
import AttendBarChart from "@/components/attend-bar-chart.jsx";
import EventCard from "@/components/event-card.jsx";
import EventSection from "@/components/event-section.jsx";


export default function Index() {
    const navigate = useNavigate();
    // const [UID,language] = useUserStore(state => [state.UID,state.language]);
    // const {t} =  useTranslation();


    const connect_group_id = "GUeEXeUO0Evpi5NhkOf3"


    const {data, isLoading, isError} = useQuery({
        queryKey: ["/getAllEventsWithSessionsWithCGID"],
        queryFn: () => getAllEventsWithSessionsWithCGID(connect_group_id)
    });
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        console.log(data)
        if (data.status) {
            setEventList(data.data);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);

    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const actions = [
        {
            text: 'Submit Number',
            key: 'submit',
            onClick: () => {
                navigate(`/attendance/${currentEvent.event.id}/${currentEvent.session.id}`)
            }
        },
        {
            text: 'Edit Event',
            key: 'edit',
            onClick: () => {
                navigate(`/event/${connect_group_id}/${currentEvent.event.id}`)
            }
        },
    ]

    const [currentEvent, setCurrentEvent] = useState(null);


    return (
        <div className={"h-screen flex flex-col justify-center items-center"}>
            <ProfileToken/>
            <div className={"h-screen w-full flex flex-col justify-start items-center p-4 overflow-y-auto pt-12"}>
                <CgCard connect_group_id={connect_group_id}/>
                <AttendRate connect_group_id={connect_group_id}/>
                {/*<AttendBarChart attendData={[]}/>*/}

                <div className={"flex flex-row items-center justify-between w-full mt-4 mb-2"}>
                    <div className={"text-lg font-semibold"}>CG Events</div>
                    <Button onClick={() => {
                        navigate(`/event/${connect_group_id}`)
                    }}
                            className={"bg-white text-black text-base rounded-full border border-black  w-[121px] h-[32px] flex justify-center items-center"}
                    >
                        Add Event
                    </Button>
                </div>


                <EventSection eventList={eventList}
                              setCurrentEvent={setCurrentEvent}
                              setActionSheetVisible={setActionSheetVisible}
                />


                <ActionSheet
                    visible={actionSheetVisible}
                    actions={actions}
                    onClose={() => setActionSheetVisible(false)}
                />

            </div>

        </div>
    )
}