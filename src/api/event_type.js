const host_url = import.meta.env.VITE_HOST_URL;

// 创建 EventType
export async function createEventType(data) {
    const response = await fetch(`${host_url}/event_type`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create event type");
    }

    return response.json();
}

// 获取所有 EventType
export async function getAllEventTypes() {
    const response = await fetch(`${host_url}/event_type/event_types`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch event types");
    }

    return response.json();
}

// 更新 EventType（部分更新）
export async function patchEventType(name, data) {
    const response = await fetch(`${host_url}/event_type/${encodeURIComponent(name)}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to patch event type: ${name}`);
    }

    return response.json();
}

// 删除 EventType
export async function deleteEventType(name) {
    const response = await fetch(`${host_url}/event_type/${encodeURIComponent(name)}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete event type: ${name}`);
    }

    return response.json();
}
