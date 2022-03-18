import React from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/collection preview/collectionPreview.componnent";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collection: SHOP_DATA };
  }
  render() {
    return (
      <div>
        {this.state.collection
          .map(({ id, ...otherProperties }) => (
            <CollectionPreview key={id} {...otherProperties} />
          ))}
      </div>
    );
  }
}

export default ShopPage;
