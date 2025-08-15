import { Routes, Route } from 'react-router-dom';
import Index from "../pages/index.jsx";
import About from "../pages/framework/about.jsx";
import Settings from "@/pages/framework/settings.jsx";
import PrivacyPolicy from "@/pages/framework/privacy-policy.jsx";
import TermsOfService from "@/pages/framework/terms-of-service.jsx";
import Event from "@/pages/event/event.jsx";
import Attendance from "@/pages/attendance/attendance.jsx";

export default function MainRoutes(){
    return (
        <Routes>
            <Route path="/:CGID" element={<Index />} />
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* edit event */}
            <Route path="/event/:connect_group_id/:event_id" element={<Event />} />
            {/* add event */}
            <Route path="/event/:connect_group_id" element={<Event />} />
            {/* add attendance */}
            <Route path="/attendance" element={<Attendance />} />
            {/* edit attendance */}
            <Route path="/attendance/:eventID/:session_id/:connect_group_id" element={<Attendance />} />
        </Routes>
    )
}