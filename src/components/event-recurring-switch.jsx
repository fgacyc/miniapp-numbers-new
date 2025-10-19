import {Select, Space, Switch} from "@arco-design/web-react";
import Block from "@/components/block.jsx";
import {useQuery} from "@tanstack/react-query";
import {getAllEventsWithSessionsWithCGID, getRecurringEventsByEventId} from "@/api/event.js";
import {useEffect} from "react";
const Option = Select.Option;

export default function EventRecurringSwitch({ event_id,isRecurring, setIsRecurring , recurringInterval, setRecurringInterval,isEditMode,setHasRecurringTemplate}) {
    const recurringOptions = [
        { label: '1 Week', value: 7 },
        { label: '2 Weeks', value: 14 },
        { label: '3 Weeks', value: 21 },
        { label: '4 Weeks', value: 28 }
    ]
    /// 只允许创建的时候设置重复事件
    /// 如果创建的时候设置了重复事件，接下来在编辑的时候就可以看到重复事件的信息，可以进行修改
    /// 所以在编辑模式下，只有event_recurring 里面有记录才允许修改
    /// 没有记录的话，也就是没有设置重复事件，就不显示重复事件的修改


    // 如果在编辑模式下
    //  查询当前任务是否有重复事件模板，有的话就显示重复编辑组件，否则就隐藏

    // if(isEditMode){
    //     const {data, isLoading, isError} = useQuery({
    //         queryKey: ["/getAllEventsWithSessionsWithCGID"],
    //         queryFn: () => getRecurringEventsByEventId(event_id)
    //     });
    //
    //     useEffect(() => {
    //         if (isLoading) return;
    //         if (isError) return;
    //         // console.log(data)
    //         if (data.status) {
    //             if (data.data && data.data.length > 0) {
    //                 setHasRecurringTemplate(true);
    //             } else {
    //                 setHasRecurringTemplate(false);
    //             }
    //         } else {
    //             console.log("Error fetching event types");
    //         }
    //     }, [data]);
    // }


    return(
       <div className={`my-3 ${isEditMode ? 'hidden' : ''}`}>
           <Space className={"ml-3"}>
               <Switch size='small'
                       checked={isRecurring}
                       onChange={setIsRecurring}
               />
               <span className={"text-[#9ca3af]"}>Make Recurring</span>
           </Space>

           <Block title={"Event Recurring"} className={`mb-2 ${isRecurring ? '' : 'hidden'}`}>
               <Select
                   placeholder='Please select event type'
                   value={recurringInterval}
                   onChange={setRecurringInterval}
               >
                   {recurringOptions.map((option, index) => (
                       <Option key={index} value={option.value}>
                           {option.label}
                       </Option>
                   ))}
               </Select>
           </Block>
       </div>


)
}