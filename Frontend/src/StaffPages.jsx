import { ColorModeContext, useMode } from "./base/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import DashboardStaff from "./StaffViews/scense/dashboard";
import SidebarManager from "./StaffViews/scense/global/SidebarManager";
import DriverManager from "./StaffViews/scense/drivers";

const ManagerViewsLayout = ({ children }) => {
    const [theme, colorMode] = useMode();
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SidebarManager />
            <main className="content">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  };

const StaffPages = () =>  (
    <Routes>

<Route
        path="/dashboard-staff"
        element={
          <ManagerViewsLayout>
            <DashboardStaff />
          </ManagerViewsLayout>
        }
      />
      <Route
        path="/team-manager"
        element={
          <ManagerViewsLayout>
            <DriverManager />
          </ManagerViewsLayout>
        }
      />

    
    </Routes>
  )


export default StaffPages;
