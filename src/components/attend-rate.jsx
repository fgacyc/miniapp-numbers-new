export default function AttendRate({rateData}) {
    return (
        <div className="p-3 flex flex-row items-center justify-between shadow-sm rounded-lg w-full mt-4 h-[80px]"
             style={{
                 background: 'linear-gradient(to bottom right,#ffffff, #41FAD3)',
             }}
        >
            <div>Recent 4 weeks attend rate</div>
            <div>Progress:{rateData}</div>
        </div>
    );
}