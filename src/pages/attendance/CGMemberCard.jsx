import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "@/api/user.js";
import {useEffect, useState} from "react";

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
    const { data, isLoading, isError } = useQuery({
        queryKey: ["/getAllUsers"],
        queryFn: () => getAllUsers(connect_group_id),
    });

    const [CGMemberListWithSession, setCGMemberListWithSession] = useState([]);

    useEffect(() => {
        if (isLoading || isError) return;
        if (data.status) {
            // 初始化成员状态（默认 absent）
            const initialList = data.data.map((member) => ({
                ...member,
                session_id: session_id,
                user_id: member.user_id,
                status: false, // 默认 absent
                reason: "",     // 可选：记录原因
            }));
            setCGMemberListWithSession(initialList);
        } else {
            console.log("Error fetching event types");
        }
    }, [data]);

    // 处理 status 状态更新
    const handleStatusChange = (index, value) => {
        setCGMemberListWithSession((prev) => {
            const newList = [...prev];
            newList[index].status = value === "green"; // green = present, red = absent
            return newList;
        });
    };

    useEffect(() => {
        console.log(CGMemberListWithSession);
    }, [CGMemberListWithSession]);

    return (
        <div>
            {CGMemberListWithSession.map((member, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center bg-white mb-2 w-full rounded-sm shadow-md p-4 relative"
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
                                    <div className="text-gray-500">{member.email}</div>
                                </div>
                                <StatusRadioGroup
                                    name={`status-${index}`}  // 独立 name 避免冲突
                                    checkedValue={member.status}
                                    onChange={(value) => handleStatusChange(index, value)}
                                />
                            </div>
                            {/*<Input*/}
                            {/*    placeholder="Reason"*/}
                            {/*    value={member.reason}*/}
                            {/*    onChange={(value) => {*/}
                            {/*        const newList = [...CGMemberListWithSession];*/}
                            {/*        newList[index].reason = value;*/}
                            {/*        setCGMemberListWithSession(newList);*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
