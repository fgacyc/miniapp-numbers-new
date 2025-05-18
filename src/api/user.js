const host_url = "http://127.0.0.1:5000";


export async function getAllUsers(connect_group_id) {
    const response = await fetch(`${host_url}/user/${connect_group_id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all events with sessions");
    }

    return response.json();
}