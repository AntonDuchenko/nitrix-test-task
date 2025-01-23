import { Route, Routes } from "react-router";
import { AppartmentsPage } from "./pages/Appartments/Appartments";
import { Navigate } from "react-router";
import { Header } from "./components";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/appartments" />} />
        <Route path="/appartments" element={<AppartmentsPage />} />
      </Routes>
    </>
  );
}

export default App;
