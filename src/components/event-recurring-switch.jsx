import { Select, Space, Switch } from "@arco-design/web-react";
import Block from "@/components/block.jsx";
import { useQuery } from "@tanstack/react-query";
import { getRecurringEventsByEventId } from "@/api/event.js";
import { useEffect, useState } from "react";

const Option = Select.Option;

export default function EventRecurringSwitch({event_id,
                                                 isRecurring,
                                                 setIsRecurring,
                                                 recurringInterval,   // 7 | 14 | 21 | 28
                                                 setTemplateId,       // 用于保存/更新后端的 Recurring Template Id 或 Interval（与你现有签名保持一致）
                                                 isEditMode,
                                                 setRecurringInterval, // 用于更新选择的重复间隔
                                             }) {
    const [hasTemplate, setHasTemplate] = useState(false);

    const recurringOptions = [
        { label: "1 Week", value: 7 },
        { label: "2 Weeks", value: 14 },
        { label: "3 Weeks", value: 21 },
        { label: "4 Weeks", value: 28 },
    ];

    // 仅编辑模式 + 有 event_id 时请求
    const { data, isLoading, isError } = useQuery({
        queryKey: ["recurringEventsByEventId", event_id],
        queryFn: () => getRecurringEventsByEventId(event_id),
        enabled: Boolean(isEditMode && event_id),
    });

    useEffect(() => {
        if (!isEditMode) {
            // 创建模式不需要查询结果来决定显示，直接显示
            setHasTemplate(false);
            return;
        }
        if (isLoading || isError) return;

        const ok = data?.status === true;
        const list = Array.isArray(data?.data) ? data.data : [];
        const first = list[0];

        const found = ok && first && (first.id || first.template_id || first.templateId);
        setHasTemplate(Boolean(found));
        // setHasRecurringTemplate?.(Boolean(found));

        // 如果后端返回了模板的 id 或者 interval，这里按你的后端字段回填
        if (found) {
            // 优先尝试常见字段名，防止后端命名差异
            const tplId = first.template_id ?? first.templateId ?? first.id;
            if (tplId) setTemplateId(tplId);
            // 若后端也返回了 interval，可在此根据 first.interval 去同步 UI
            // 例如：setTemplateId(first.interval) —— 取决于你的后端定义
        }
    }, [isEditMode, isLoading, isError, data, setTemplateId]);

    // 显隐规则：创建模式总是显示；编辑模式仅当查询到模板时显示
    const shouldShow = !isEditMode || (isEditMode && hasTemplate);

    return (
        <div className={`my-3 ${shouldShow ? "" : "hidden"}`}>
            {/* 创建模式：允许选择是否“设为重复” */}
            {!isEditMode && (
                <Space className="ml-3">
                    <Switch
                        size="small"
                        checked={isRecurring}
                        onChange={setIsRecurring}
                    />
                    <span className="text-[#9ca3af]">Make Recurring</span>
                </Space>
            )}

            {/* 块显隐：
          - 创建模式：isRecurring=true 时显示选择频率
          - 编辑模式：hasTemplate=true 时显示（可用于查看/修改频率或模板）
      */}
            <Block
                title={"Event Recurring"}
                className={`mb-2 ${
                    isEditMode
                        ? ""              // 编辑模式下只要有模板（外层已控制 shouldShow），就显示
                        : isRecurring
                            ? ""
                            : "hidden"
                }`}
            >
                <Select
                    placeholder="Select recurrence interval"
                    value={recurringInterval}
                    onChange={setRecurringInterval}  // 与你现有 props 名保持一致（如果你实际想更新 interval，可把回调换成 setRecurringInterval）
                >
                    {recurringOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </Block>
        </div>
    );
}
