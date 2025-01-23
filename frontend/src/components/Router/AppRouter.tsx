import { Navigate, Route, Routes } from "react-router";
import { AppartmentsPage } from "../../pages/Appartments/Appartments";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/appartments" />} />
      <Route path="/appartments" element={<AppartmentsPage />} />
    </Routes>
  );
};
