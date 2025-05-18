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
import { getAllEventsWithSessionsWithCGID} from "@/api/event.js";
import {IconRight} from "@arco-design/web-react/icon";



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
        if (isError)  return;
        console.log(data)
        if (data.status) {
            setEventList(data.data);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);

    const [actionSheetVisible   , setActionSheetVisible] = useState(false);
    const actions = [
        {
            text: 'Submit Number',
            key: 'submit' ,
            onClick: () => {
                navigate(`/attendance/${currentEvent.event.id}/${currentEvent.session.id}`)
            }
        },
        {
            text: 'Edit Event',
            key: 'edit',
            onClick: () => {
                navigate(`/event/${currentEvent.event.id}`)
            }
        },
    ]

    const [currentEvent, setCurrentEvent] = useState(null);



    return (
        <div className={"h-screen flex flex-col justify-center items-center"}>
            <ProfileToken/>
            <div className={"h-screen w-full flex flex-col justify-start items-center"}>
                <div className={"h-[60px]"}></div>
                <Button onClick={() => {
                    navigate(`/event/${connect_group_id}`)
                }}
                        className={"bg-white text-black rounded-full border border-black  w-[200px] h-[50px] flex justify-center items-center"}
                >
                    Add Event
                </Button>

                {
                    eventList.map((event, index) => {
                        return (
                            <div key={index} className={"flex flex-col items-center bg-white mb-2 w-full rounded-sm shadow-md p-4 relative"}
                                    onClick={() => {
                                        setCurrentEvent(event)
                                        setActionSheetVisible(true)
                                    }}
                            >
                                <div className={"text-gray-500"}>{event.event.name}</div>
                                <div className={"text-gray-500"}>{event.session.startAt}</div>
                                <div className={"text-gray-500"}>{event.session.endAt}</div>

                                {/*  在右侧添加一个图标，位置绝对定位 ，在右侧的中间位置 */}
                                <div className={"absolute   top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"} >
                                    <IconRight />
                                </div>
                            </div>
                        )
                    })
                }

                <ActionSheet
                    visible={actionSheetVisible}
                    actions={actions}
                    onClose={() => setActionSheetVisible(false)}
                />




                {/*<div className={"mt-20 text-gray-500"}>*/}
                {/*    {dayjs(dateSelected).format('YYYY-MM-DD')}*/}
                {/*</div>*/}

                {/*<DatePicker*/}
                {/*    triggerElement={null}*/}
                {/*    style={{ width: 268 }}*/}
                {/*    value={singleDate}*/}
                {/*    onChange={(v) => setDateSelected(v)}*/}
                {/*    pickerValue={singleDate}*/}
                {/*    onPickerValueChange={(v) => setDateSelected(v)}*/}
                {/*/>*/}
            </div>

        {/*https://mobile.ant.design/zh/components/action-sheet*/}
        </div>
    )
}