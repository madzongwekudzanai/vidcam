import React from "react";
import SidebarMiniSearch from "./SidebarMiniSearch";
import Categories from "./Categories";
import LatestPosts from "./LatestPosts";
import PopularPosts from "./PopularPosts";

const Sidebar = () => {
  return (
    <div className="col-xs-12 col-sm-4 col-md-3">
      <aside className="sidebar">
        <div className="sidebar-inner">
          <SidebarMiniSearch />
          <div className="clear"></div>
          <Categories />
          <div className="clear"></div>
          <LatestPosts />
          <div className="clear"></div>
          <PopularPosts />
          <div className="clear"></div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
