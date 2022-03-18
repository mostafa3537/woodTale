import React from "react";
import CollectionItem from "../coolection-item/collection-item.component";
import './collectionPreview.componnent.scss'

export const CollectionPreview = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((collection, index) => index < 4)
          .map(({id, ...otherProps}) => (
            <CollectionItem key={id} {...otherProps} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
