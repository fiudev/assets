import React from "react";
import GalleryGrid from "react-grid-gallery";

export default class Gallery extends React.Component {
  render() {
    const { assets } = this.props;
    return <GalleryGrid images={assets} />;
  }
}
