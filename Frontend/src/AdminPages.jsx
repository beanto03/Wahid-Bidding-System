import { Routes, Route } from "react-router-dom";
import Topbar from "./HodViews/scense/global/Topbar";
import SidebarAdmin from "./HodViews/scense/global/SidebarAdmin";
import { ColorModeContext, useMode } from "./base/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import DashboardAdmin from "./HodViews/scense/dashboard";
import TeamAdmin from "./HodViews/scense/team";
import AddTeam from "./HodViews/scense/team/addTeam";
import EditTeam from "./HodViews/scense/team/editTeam";

import Services from "./HodViews/scense/services";





const HodViewsLayout = ({ children }) => {
    const [theme, colorMode] = useMode();
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SidebarAdmin />
            <main className="content">
              <Topbar />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  };

const AdminPages = () => (


    <Routes>
    
      <Route
        path="/dashboard-admin"
        element={
          <HodViewsLayout>
            <DashboardAdmin />
          </HodViewsLayout>
        }
      />
      <Route
        path="/team-admin"
        element={
          <HodViewsLayout>
            <TeamAdmin />
          </HodViewsLayout>
        }
      />

      <Route
        path="/addteam"
        element={
          <HodViewsLayout>
            <AddTeam />
          </HodViewsLayout>
        }
      />

      <Route
        path="/editTeam/:user_id"
        element={
          <HodViewsLayout>
            <EditTeam />
          </HodViewsLayout>
        }
      />


      <Route
        path="/services"
        element={
          <HodViewsLayout>
            <Services />
          </HodViewsLayout>
        }
      />

    </Routes>
)

export default AdminPages;
