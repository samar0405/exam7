import { Outlet } from "react-router-dom";
import Sidebar from "../../components/ui/sidebar/index";
import "./index.css";

const Index = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="headdd">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Index;
