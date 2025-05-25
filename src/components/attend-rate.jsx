import SemiCircleProgressBar from "react-progressbar-semicircle";
import {useQuery} from "@tanstack/react-query";
import {get_attendance_rate_monthly} from "@/api/data.js";
import {useEffect, useState} from "react";


export default function AttendRate({connect_group_id}) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["/get_attendance_rate_monthly"],
        queryFn: () => get_attendance_rate_monthly(connect_group_id)
    });

    const [attendanceRate, setAttendanceRate] = useState(0);

    useEffect(() => {
        if (isLoading) return;
        if (isError)  return;
        console.log(data)
        if (data.status) {
            setAttendanceRate(data.data.attendance_rate);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);


    return (
        <div className="p-3 flex flex-row items-center justify-between shadow-sm rounded-lg w-full mt-4 h-[80px]"
             style={{
                 background: 'linear-gradient(to bottom right,#ffffff, #41FAD3)',
             }}
        >

            <div>Recent 4 weeks attend rate</div>

            <SemiCircleProgressBar
                percentage={attendanceRate*100}
                showPercentValue
                stroke={"#191D1A"}
                strokeWidth={15}
                background={"#ffffff"}
                diameter={130}
            />
        </div>
    );
}