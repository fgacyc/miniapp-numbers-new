import {useNavigate} from "react-router-dom";
import NavBar from "@/components/nav-bar.jsx";
import Block from "@/components/block.jsx";
import {useState} from "react";
import {DatePicker, Select, TimePicker,Input} from "@arco-design/web-react";

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

    // Event Type
    // Event Date
    // Start Time
    // End Time
    // Remark

    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [remark, setRemark] = useState("");

    // const [eventTypeVisible, setEventTypeVisible] = useState(false);
    // const [visible1, setVisible1] = useState(false)
    // const today = dayjs()
    // const singleDate = new Date(today.year(), today.month(), today.date())

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
                    {options.map((option, index) => (
                        <Option key={index} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </Block>

            <Block title={"Event Date"} className={"mb-2"}>
                <DatePicker
                    defaultValue={new Date()}
                    onSelect={(value) => {
                        console.log(value)
                        setEventDate(value)
                    }}
                />
            </Block>

            <Block title={"Start Time"} className={"mb-2"}>
                <TimePicker
                    defaultValue={new Date()}
                    onSelect={(value) => {
                        console.log(value)
                        setStartTime(value)
                    }}
                />
            </Block>

            <Block title={"End Time"} className={"mb-2"}>
                <TimePicker
                    defaultValue={new Date()}
                    onSelect={(value) => {
                        console.log(value)
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
                        console.log(value)
                        setRemark(value)
                    }}
                />
            </Block>

            {/* button on the foot   */}
            <div className={"flex justify-center items-center mt-4"}>
                <button className={"bg-blue-500 text-white px-4 py-2 rounded"} onClick={() => {
                    console.log("Event Type: ", eventType);
                    console.log("Event Date: ", eventDate);
                    console.log("Start Time: ", startTime);
                    console.log("End Time: ", endTime);
                    console.log("Remark: ", remark);
                }}>
                    Submit
                </button>
            </div>
        </div>
    )
}