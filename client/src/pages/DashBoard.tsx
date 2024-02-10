import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PatientList from "./PatientList";
import { SidebarData } from "../components/SidebarData";
import PatientForm from "./PatientForm";
import EditPatientForm from "./EditPatientForm";

export default function DashBoard() {

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar routes={SidebarData} />
      <main className=" w-full ">
        <Routes>
          <Route path="patient" element={<PatientList />} />
          <Route path="add-patient" element={<PatientForm />} />
          <Route path="patient/:id" element={<EditPatientForm />} />
        </Routes>
      </main>
    </div>
  );
}
