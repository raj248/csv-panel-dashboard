import { AuthProvider } from "./context/auth-context";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme/theme-provider";
import UserOverview from "./pages/Overview";
import FileUploader from "./pages/Upload";
import UploadEventsPage from "./pages/UploadEvents";
import AllUploadEventsPage from "./pages/AllUploadEvents";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/overview" element={<UserOverview />} />
              <Route path="/upload" element={<FileUploader />} />
              <Route path="/upload-events" element={<UploadEventsPage />} />
              <Route
                path="/upload-events/all"
                element={<AllUploadEventsPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
