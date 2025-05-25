const host_url = import.meta.env.VITE_HOST_URL;

export async function get_attendance_rate_monthly(connect_group_id) {
    const response = await fetch(`${host_url}/data/attendance-rate/monthly/${connect_group_id}`, {
        method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch attendance by session ID");
    return response.json();
}