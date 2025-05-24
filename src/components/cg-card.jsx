import {useQuery} from "@tanstack/react-query";
import {getAllEventsWithSessionsWithCGID} from "@/api/event.js";
import {getConnectGroup} from "@/api/user.js";
import {useEffect, useState} from "react";
import {IconUserGroup} from "@arco-design/web-react/icon";
import {FaUserGroup} from "react-icons/fa6";

export default function CgCard({connect_group_id }) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["/getConnectGroup"],
        queryFn: () => getConnectGroup(connect_group_id)
    });

    const [connectGroup, setConnectGroup] = useState(null);

    useEffect(() => {
        if (isLoading) return;
        if (isError)  return;
        console.log(data)
        if (data.status) {
            setConnectGroup(data.data);
        } else {
            console.log("Error fetching connect group");
        }
    }, [data]);



    return (
        <>
            {
                connectGroup ? (
                    <div className="w-full flex flex-row items-center justify-start bg-white shadow-sm rounded-lg  p-3 ">
                        <img src={"/cg_photo.png"} alt="Connect Group" className="w-1/3 mr-2" />
                        <div className="cg-card">
                            <h2>CG Group</h2>
                            <p>CG Name: {connectGroup.name}</p>
                            <p className={"flex flex-row items-center"}>
                                <FaUserGroup style={{color: "#00BA93", fontSize: "1.2em"}} />

                               <span className={"ml-2"}>{connectGroup.user_ids.length}</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="cg-card">
                        <p>Loading connect group...</p>
                    </div>
                )
            }
        </>
    );
}