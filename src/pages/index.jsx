import { useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileToken from "@/components/profile-token.jsx";
// import {useUserStore} from "@/store/user-store.js";
// import {useTranslation} from "react-i18next";
import dayjs from 'dayjs'
import {DatePicker} from "@arco-design/web-react";
import {Button} from "antd-mobile";


export default function Index() {
    // const [count, setCount] = useState(0)
    const navigate = useNavigate();
    // const [UID,language] = useUserStore(state => [state.UID,state.language]);
    // const {t} =  useTranslation();

    // const [visible1, setVisible1] = useState(false)
    const [dateSelected, setDateSelected] = useState()

    const today = dayjs()
    const singleDate = new Date(today.year(), today.month(), today.date())


    return (
        <div className={"h-screen flex flex-col justify-center items-center"}>
            <ProfileToken/>
            <div className={"flex flex-col items-center mt-4"}>
                <Button onClick={() => {
                    navigate('/event')
                } }>
                    Add Event
                </Button>




                <div className={"mt-20 text-gray-500"}>
                    {dayjs(dateSelected).format('YYYY-MM-DD')}
                </div>

                <DatePicker
                    triggerElement={null}
                    style={{ width: 268 }}
                    value={singleDate}
                    onChange={(v) => setDateSelected(v)}
                    pickerValue={singleDate}
                    onPickerValueChange={(v) => setDateSelected(v)}
                />
            </div>

        {/*https://mobile.ant.design/zh/components/action-sheet*/}
        </div>
    )
}