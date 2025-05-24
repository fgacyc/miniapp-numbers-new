export default function AttendBarChart({ attendData }) {
    return (
        <div className="p-3 flex flex-col items-start justify-between shadow-sm rounded-lg w-full mt-4 h-[160px] bg-white"
        >
            <div>Weekly Average</div>
            <div>X person</div>
            <div>Chart</div>
        </div>
    );
}