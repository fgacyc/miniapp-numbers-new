import { useNavigate, useParams } from "react-router-dom";
import NavBar from "@/components/nav-bar.jsx";
import Block from "@/components/block.jsx";
import { useEffect, useState } from "react";
import { DatePicker, Select, TimePicker, Input,Space ,Switch} from "@arco-design/web-react";
import { getAllEventTypes } from "@/api/event_type.js";
import {
    getEventWithSession,
    createEventWithSession,
    updateEventWithSession, deleteEventWithSession
} from "@/api/event.js";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Toast} from "antd-mobile";
import EventRecurringSwitch from "@/components/event-recurring-switch.jsx";

const TextArea = Input.TextArea;
const Option = Select.Option;

export default function Event() {
    const navigate = useNavigate();
    const { connect_group_id, event_id } = useParams();
    const isEditMode = !!event_id;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["/getAllEventTypes"],
        queryFn: getAllEventTypes
    });

    const [EventTypes, setEventTypes] = useState(null);
    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState(new Date());
    const [startTime, setStartTime] = useState(dayjs(new Date()).format("HH:mm:ss"));
    const [endTime, setEndTime] = useState(dayjs(new Date()).format("HH:mm:ss"));
    const [remark, setRemark] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringInterval, setRecurringInterval] = useState(7);



    // Load event types
    useEffect(() => {
        if (isLoading || isError) return;
        if (data.status) {
            setEventTypes(data.data);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);

    // Load existing event if editing
    useEffect(() => {
        if (!isEditMode) return;

        async function fetchEventData() {
            const res = await getEventWithSession(event_id);
            if (res.status) {
                const e = res.data.event;
                const s = res.data.session;
                // console.log(s);
                setEventType(e.type);
                setRemark(e.description);
                setEventDate(dayjs(s.startAt).toDate());
                setStartTime(dayjs(s.startAt).format("HH:mm:ss"));
                setEndTime(dayjs(s.endAt).format("HH:mm:ss"));
            } else {
                Toast.show({ content: 'Failed to load event data' });
            }
        }

        fetchEventData();
    }, [isEditMode, event_id]);

    async function handleSubmit() {
        if (!eventType || !eventDate || !startTime || !endTime) {
            alert("Please fill in all fields");
            return;
        }

        const event_date = dayjs(eventDate).format("YYYY-MM-DD");
        const eventData = {
            name: eventType,
            description: remark,
            type: eventType,
            start_at: `${event_date}T${startTime}+00:00`,
            end_at: `${event_date}T${endTime}+00:00`,
            expected_attendees: 0,
            connect_group_id: connect_group_id,
        };

        console.log(eventData);

        const res = isEditMode
            ? await updateEventWithSession(event_id, eventData)
            : await createEventWithSession(eventData);

        // 如果是创建，且不重复，直接pass

        // 如果是创建，且重复，调用后台接口创建重复事件

        // 如果是编辑，但是无重复模板，直接pass

        // 如果是编辑，且有重复模板，调用后台接口更新重复事件

        if (res.status) {
            Toast.show({
                content: isEditMode ? 'Event updated successfully' : 'Event created successfully',
                afterClose: () => navigate("/")
            });
        } else {
            Toast.show({ content: "Operation failed" });
        }
    }

    async function handleDelete() {
        if (!isEditMode) return;
        if (!confirm("Are you sure you want to delete this event?")) return;
        const res =await deleteEventWithSession(event_id);
        if (res.status) {
            Toast.show({
                content: 'Event deleted successfully',
                afterClose: () => navigate("/")
            });
        } else {
            Toast.show({ content: "Failed to delete event" });
        }
    }

    return (
        <div>
            <NavBar ifShowBackArrow={true}>
                {isEditMode ? "Edit Event" : "Add Event"}
            </NavBar>

            <Block title={"Event Type"} className={"mb-2"}>
                <Select
                    placeholder='Please select event type'
                    value={eventType}
                    onChange={setEventType}
                >
                    {!isLoading && !isError && EventTypes &&
                        EventTypes.map((option, index) => (
                            <Option key={index} value={option.name}>
                                {option.name}
                            </Option>
                        ))}
                </Select>
            </Block>

            <Block title={"Event Date"} className={"mb-2"}>
                <DatePicker
                    value={dayjs(eventDate).toDate()}
                    onSelect={(value) => setEventDate(value)}
                />
            </Block>

            <Block title={"Start Time"} className={"mb-2"}>
                <TimePicker
                    value={startTime}
                    onSelect={(value) => {
                        setStartTime(value)
                        // setStartTime(value);
                    }}
                />
            </Block>

            <Block title={"End Time"} className={"mb-2"}>
                <TimePicker
                    value={endTime}
                    onSelect={(value) => setEndTime(value)}
                />
            </Block>


           <EventRecurringSwitch isRecurring={isRecurring}
                                 setIsRecurring={setIsRecurring}
                                 recurringInterval={recurringInterval}
                                 setRecurringInterval={setRecurringInterval}
                                 isEditMode ={isEditMode}
           />


            <Block title={"Remark"} className={"mb-2"}>
                <TextArea
                    placeholder="Add a remark"
                    value={remark}
                    onChange={setRemark}
                />
            </Block>

            {
                isEditMode && (
                    <div className={"text-red-500 py-2 ml-4"} onClick={handleDelete}>
                        Remove Event
                    </div>
                )
            }

            <div className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-lg ">
                <button className="w-[calc(100%-20px)] max-w-[600px] bg-[#191D1A] text-white py-2 rounded-full"
                        onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
