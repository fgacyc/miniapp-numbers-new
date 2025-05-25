const host_url = "http://127.0.0.1:5000";

export async function get_attendance_rate_monthly(connect_group_id) {
    const response = await fetch(`${host_url}/data/attendance-rate/monthly/${connect_group_id}`, {
        method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch attendance by session ID");
    return response.json();
}