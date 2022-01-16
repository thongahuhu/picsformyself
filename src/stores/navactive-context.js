import { createContext, useState } from "react";

import React from "react";

const NavActiveContext = createContext();

export function NavActiveProvider({ children }) {
  const [activeTab, setActiveTab] = useState("All"); //set tab active mặc định là trang All

  const handleActiveTab = (page) => {
    setActiveTab(page);
  };

  const context = {
    active: activeTab,
    handleActiveTab: handleActiveTab,
  };
  return (
    <NavActiveContext.Provider value={context}>
      {children}
    </NavActiveContext.Provider>
  );
}

export default NavActiveContext;
