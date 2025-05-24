const host_url = "http://127.0.0.1:5000";

// 创建 Event 和 Session
export async function createEventWithSession(data) {
    const response = await fetch(`${host_url}/event/event_with_session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create event with session");
    }

    return response.json();
}

// 获取单个 Event 和 Session
export async function getEventWithSession(eventId) {
    const response = await fetch(`${host_url}/event/event_with_session/event/${encodeURIComponent(eventId)}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch event with session: ${eventId}`);
    }

    return response.json();
}

// 获取所有 Event 和 Session 使用 connect_group_id
export async function getAllEventsWithSessionsWithCGID(connect_group_id) {
    const response = await fetch(`${host_url}/event/event_with_session/connect_group_id/${connect_group_id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all events with sessions");
    }

    return response.json();
}

// 根据 Event ID 获取所有 event 和 Session
// 因为 attendance提交的是 session_id,而不是 event_id, 所以这里需要根据eventId 把event 和 session都查出来
export async function getAllEventsWithSessionsByEventId(eventId) {
    const response = await fetch(`${host_url}/event/event_with_session/event/${encodeURIComponent(eventId)}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch all events with sessions by event ID: ${eventId}`);
    }

    return response.json();
}

// 更新 Event 和 Session（部分更新）
export async function updateEventWithSession(eventId, data) {
    const response = await fetch(`${host_url}/event/event_with_session/${encodeURIComponent(eventId)}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update event with session: ${eventId}`);
    }

    return response.json();
}

// 删除 Event 和 Session
export async function deleteEventWithSession(eventId) {
    const response = await fetch(`${host_url}/event/event_with_session/${encodeURIComponent(eventId)}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete event with session: ${eventId}`);
    }

    return response.json();
}
