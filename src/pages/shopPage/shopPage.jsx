import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

const ShopPage = () => {
  let location = useLocation();

  return (
    <div className="shop-page">
      {location.pathname==="/shop"? <CollectionsOverview location={location} />:null}
      <Outlet></Outlet>
    </div>
  );
};

export default ShopPage;
