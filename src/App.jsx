import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Authpage from "./pages/Authpage";
import Profilepage from "./pages/Profilepage";
import PageLayout from "./layouts/PageLayout";
import useAuthStore from "./store/authStore";

export default function App() {
  const authUser = useAuthStore(state => state.user)
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/auth"/>} />
        <Route path="/auth" element={!authUser ? <Authpage /> : <Navigate to="/"/>} />
        <Route path="/:username" element={<Profilepage />} />
      </Routes>
    </PageLayout>
  );
}
