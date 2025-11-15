// src/App.jsx
import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Sidebar from "./pages/Sidebar";       // keep your path
import AdminOverview from "./pages/AdminOverview";
import Approvals from "./pages/Approvals";
import Compliance from "./pages/Compliance";
import Donations from "./pages/Donations";
import Charity from "./pages/Charity";
import Beneficiaries from "./pages/Beneficiaries";
import System from "./pages/System";
import Report from "./pages/Report";
import SettingsAdmin from "./pages/SettingsAdmin";
import Donor from "./pages/Donor";
import MyDonation from "./pages/MyDonation";
import DonorSetting from "./pages/DonorSetting";
import Receipt from "./pages/Receipt";
import CampaignsDonor from "./pages/CampaignsDonor";
import Impact from "./pages/Impact";



export default function App() {
  // init AOS once
  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-out", once: true });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* MAIN CONTENT — reserve space for the fixed sidebar on md+ */}
      <main className="pl-0 md:pl-72">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/charity" element={<Charity />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/beneficiaries" element={<Beneficiaries />} />
            <Route path="/system" element={<System />} />
            <Route path="/settings" element={<SettingsAdmin/>} />
            <Route path="/donor/overview" element={<Donor/>}/>
            <Route path="/donor/mydonations" element={<MyDonation/>}/>
            <Route path="/donor/settings" element={<DonorSetting/>}/>
            <Route path="/donor/certificatereceipt" element={<Receipt/>}/>
            <Route path="/donor/explorecampaigns" element={<CampaignsDonor/>}/>
            <Route path="/donor/myimpact" element={<Impact/>}/>














            {/* add more routes here */}
          </Routes>
        </div>
      </main>
    </div>
  );
}
