import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "@/api/user.js";
import {useEffect, useState} from "react";
import {createAttendance, getAttendanceBySessionId, updateAttendance} from "@/api/attendance.js";
import {Toast} from "antd-mobile";

function StatusRadioGroup({ name, checkedValue, onChange }) {
    return (
        <div className="flex items-center space-x-4">
            {/* Green radio */}
            <label className="cursor-pointer">
                <input
                    type="radio"
                    name={name}
                    value="green"
                    checked={checkedValue === true}
                    onChange={() => onChange("green")}
                    className="sr-only"
                />
                <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${checkedValue === true ? "border-green-500" : "border-gray-300"}
                    `}
                >
                    {checkedValue === true && (
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                    )}
                </span>
            </label>

            {/* Red radio */}
            <label className="cursor-pointer">
                <input
                    type="radio"
                    name={name}
                    value="red"
                    checked={checkedValue === false}
                    onChange={() => onChange("red")}
                    className="sr-only"
                />
                <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${checkedValue === false ? "border-red-500" : "border-gray-300"}
                    `}
                >
                    {checkedValue === false && (
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                    )}
                </span>
            </label>
        </div>
    );
}


export default function CGMemberCard({ connect_group_id, session_id }) {
    const { data: userData, isLoading, isError } = useQuery({
        queryKey: ["/getAllUsers", connect_group_id],
        queryFn: () => getAllUsers(connect_group_id),
    });

    const [CGMemberListWithSession, setCGMemberListWithSession] = useState([]);
    const [attendanceMap, setAttendanceMap] = useState({}); // userId -> attendance object
    const [abbentCount, setAbsentCount] = useState(0);

    useEffect(() => {
        if (!userData || isLoading || isError || !userData.status) return;

        async function init() {
            const users = userData.data;

            let map = {};
            try {
                const res = await getAttendanceBySessionId(session_id);
                console.log("Attendance data:", res);
                if (res.status) {
                    res.data.forEach((a) => {
                        map[a.userId] = a;
                    });
                    setAttendanceMap(map);
                }
            } catch (err) {
                console.error("Error fetching attendance:", err);
            }

            const list = users.map((user) => ({
                ...user,
                user_id: user.id,
                session_id,
                status: map[user.id]?.status ?? false,
                reason: map[user.id]?.description ?? "",
            }));

            setCGMemberListWithSession(list);
        }

        init();
    }, [userData]);

    const handleStatusChange = (index, value) => {
        setCGMemberListWithSession((prev) => {
            const newList = [...prev];
            newList[index].status = value === "green";
            return newList;
        });
    };

    // const handleReasonChange = (index, value) => {
    //     setCGMemberListWithSession((prev) => {
    //         const newList = [...prev];
    //         newList[index].reason = value;
    //         return newList;
    //     });
    // };

    async function handleSubmit() {
        const tasks = CGMemberListWithSession.map((member) => {
            const data = {
                status: member.status,
                description: member.reason,
            };


            if (attendanceMap[member.user_id]) {
                return updateAttendance(session_id, member.user_id, data);
            } else {
                return createAttendance({
                    session_id,
                    user_id: member.user_id,
                    ...data,
                });
            }
        });



        try {
            await Promise.all(tasks);
            Toast.show({
                content: "Attendance submitted successfully",
            });
        } catch (err) {
            Toast.show({
                content: "Attendance submission failed",
            });
        }
    }

    return (
        <div>
            <div className={"flex flex-row items-center justify-between w-full mb-3"}>
                <div className={"bg-white shadow rounded p-3 w-1/2 mr-2"}>
                    <div className={"text-gray-400"}>No. of Members</div>
                    <div className={"font-semibold"}>{CGMemberListWithSession && CGMemberListWithSession.length}</div>
                </div>
                <div className={"bg-white shadow rounded p-3 w-1/2 ml-2"}>
                    <div className={"text-gray-400"}>No. of Absent</div>
                    <div className={"font-semibold"}>
                        {CGMemberListWithSession.filter((member) => member.status === false).length}
                    </div>
                </div>
            </div>

            <div className={"flex flex-row items-center justify-between w-full bg-black text-gray-200 p-1 text-xs"}>
                <div className="ml-3">Member</div>
                <div className={"flex"}>
                    <div className={"mr-2"}>Present</div>
                    <div>Absent</div>
                </div>
            </div>
            {CGMemberListWithSession.map((member, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center bg-white  w-full p-4 relative"
                >
                    <div className="flex flex-row items-center justify-between w-full">
                        <img
                            src={member.avatar_url}
                            referrerPolicy="no-referrer"
                            alt="avatar"
                            className="w-[50px] h-[50px] rounded-full mr-4"
                        />
                        <div className="w-full">
                            <div className="flex flex-row items-start justify-between">
                                <div>
                                    <div className="text-gray-500">{member.name}</div>
                                    <div className="text-gray-500 truncate">{member.email}</div>
                                </div>
                                <StatusRadioGroup
                                    name={`status-${index}`}
                                    checkedValue={member.status}
                                    onChange={(value) => handleStatusChange(index, value)}
                                />
                            </div>
                            {/*<Input*/}
                            {/*    placeholder="Reason"*/}
                            {/*    value={member.reason}*/}
                            {/*    onChange={(val) => handleReasonChange(index, val)}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
            ))}

            {/*<div className="flex justify-center items-center mt-4">*/}
            {/*    <button*/}
            {/*        className="bg-blue-500 text-white px-4 py-2 rounded"*/}
            {/*        onClick={handleSubmit}*/}
            {/*    >*/}
            {/*        Submit*/}
            {/*    </button>*/}
            {/*</div>*/}

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