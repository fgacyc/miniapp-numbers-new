import {Select, Space, Switch} from "@arco-design/web-react";
import Block from "@/components/block.jsx";
const Option = Select.Option;

export default function EventRecurringSwitch({ isRecurring, setIsRecurring , recurringInterval, setRecurringInterval}) {
    const recurringOptions = [
        { label: '1 Week', value: 7 },
        { label: '2 Weeks', value: 14 },
        { label: '3 Weeks', value: 21 },
        { label: '4 Weeks', value: 28 }
    ]
    return(
       <>
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
       </>


)
}