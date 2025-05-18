import {useNavigate} from "react-router-dom";
import NavBar from "@/components/nav-bar.jsx";
import Block from "@/components/block.jsx";
import {useEffect, useState} from "react";
import {DatePicker, Select, TimePicker,Input} from "@arco-design/web-react";
import {getAllEventTypes} from "@/api/event_type.js";
import {useQuery} from "@tanstack/react-query";
import dayjs from "dayjs";
import {createEventWithSession} from "@/api/event.js";
import {Toast} from "antd-mobile";

const TextArea = Input.TextArea;


const Option = Select.Option;

const options = [
    {
        value: 'meeting',
        label: 'Meeting',
    },
    {
        value: 'workshop',
        label: 'Workshop',
    },
    {
        value: 'conference',
        label: 'Conference',
    }
]

export default function Event() {
    const navigate = useNavigate();

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["/getAllEventTypes"],
        queryFn: getAllEventTypes
    });
    const [EventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        if (isLoading) return;
        if (isError)  return;
        // console.log(data)
        if (data.status) {
            setEventTypes(data.data);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);

    const time = dayjs(new Date()).format("HH:mm:ss");

    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState(new Date());
    const [startTime, setStartTime] = useState(time);
    const [endTime, setEndTime] = useState(time);
    const [remark, setRemark] = useState("");

    // const [eventTypeVisible, setEventTypeVisible] = useState(false);
    // const [visible1, setVisible1] = useState(false)
    const today = dayjs()
    // const singleDate = new Date(today.year(), today.month(), today.date())

    async function handleSubmit() {
        if (!eventType || !eventDate || !startTime || !endTime) {
            alert("Please fill in all fields");
            return;
        }

        // yyyy-mm-dd
        const event_date =  dayjs(eventDate).format("YYYY-MM-DD");

        const eventData = {
            "name":   eventType,
            "description":  remark,
            "type":  eventType,
            "start_at":    event_date + "T" + startTime + "+08:00",
            "end_at":   event_date + "T" + endTime +"+08:00",
            "expected_attendees": 0
        }
        console.log(eventData)

        const res = await  createEventWithSession(eventData)
        if (res.status) {
            console.log(res)
            Toast.show({
                content: 'Event created successfully',
                afterClose: () => {
                    navigate("/")
                },
            })
            // navigate("/");
        }
        else {
            console.log("Error creating event");
        }
    }

    return (
        <div>
            <NavBar ifShowBackArrow={true}>Add Event</NavBar>
            <Block title={"Event Type"} className={"mb-2"}>
                <Select
                    placeholder='Please select event type'
                    onChange={(value) =>{
                        console.log(value)
                        setEventType(value)
                    }
                    }
                >
                    {EventTypes.map((option, index) => (
                        <Option key={index} value={option.name}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
            </Block>

            <Block title={"Event Date"} className={"mb-2"}>
                <DatePicker
                    defaultValue={new Date()}
                    onSelect={(value) => {
                        // console.log(value)
                        setEventDate(value)
                    }}
                />
            </Block>

            <Block title={"Start Time"} className={"mb-2"}>
                <TimePicker
                    defaultValue={new Date()}
                    onSelect={(value) => {
                        // console.log(value)
                        setStartTime(value)
                    }}
                />
            </Block>

            <Block title={"End Time"} className={"mb-2"}>
                <TimePicker
                    defaultValue={new Date()}
                    onSelect={(value) => {
                        // console.log(value)
                        setEndTime(value)
                    }}
                />
            </Block>

            <Block title={"Remark"} className={"mb-2"}>
                <TextArea
                    type="text"
                    placeholder="Add a remark"
                    value={remark}
                    onChange={(value) => {
                        // console.log(value)
                        setRemark(value)
                    }}
                />
            </Block>

            {/* button on the foot   */}
            <div className={"flex justify-center items-center mt-4"}>
                <button className={"bg-blue-500 text-white px-4 py-2 rounded"} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}