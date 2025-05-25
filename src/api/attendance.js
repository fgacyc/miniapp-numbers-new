const host_url = import.meta.env.VITE_HOST_URL;


export async function createAttendance(data) {
    const response = await fetch(`${host_url}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create attendance");
    return response.json();
}

export async function updateAttendance(sessionId, userId, data) {
    const response = await fetch(`${host_url}/attendance/${sessionId}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update attendance");
    return response.json();
}

export async function getAttendanceBySessionId(sessionId) {
    const response = await fetch(`${host_url}/attendance/session/${sessionId}`, {
        method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch attendance by session ID");
    return response.json();
}