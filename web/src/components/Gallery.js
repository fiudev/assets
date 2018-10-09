import React from "react";
import GalleryGrid from "react-grid-gallery";
import qs from "query-string";
import assetService from "../services/assets";
import Header from "./shared/Header";

import { Navbar, NavItem } from "reactstrap";

export default class Gallery extends React.Component {
  state = { assets: new Array(), overallPages: 0, currentPage: 0 };

  componentDidMount() {
    const { location } = this.props;
    const params = qs.parse(location.search);
    this.fetchAssets(params);
  }

  fetchAssets = async params => {
    try {
      const payload = await assetService.read(params.tag, params.page);

      const { assets, overallPages, currentPage } = payload;
      this.setState({ assets, overallPages, currentPage });
    } catch (e) {
      console.log(e.message);
    }
  };

  onSelectImage = index => {
    const { assets } = this.state;
    const asset = assets.slice();
    const selectedAsset = asset[index];
    if (selectedAsset.hasOwnProperty("isSelected")) {
      selectedAsset.isSelected = !selectedAsset.isSelected;
    } else {
      selectedAsset.isSelected = true;
    }

    this.setState({ assets: asset });
  };

  selectedImages = () => {
    const { assets } = this.state;
    const selected = assets.filter((asset, i) => assets[i].isSelected);
    return selected;
  };

  next = () => {};
  previous = () => {};

  render() {
    const { assets, overallPages, currentPage } = this.state;

    return (
      <div className="gallery">
        {assets.length <= 0 && <Header text="0 assets found." />}

        {assets.length > 0 && (
          <React.Fragment>
            <Header>
              <Navbar>
                <NavItem onClick={this.next}>Next</NavItem>
                <NavItem>{currentPage + 1 + "/" + overallPages}</NavItem>
                <NavItem onClick={this.previous}>previous</NavItem>
              </Navbar>
            </Header>
            <GalleryGrid images={assets} onSelectImage={this.onSelectImage} />
          </React.Fragment>
        )}
      </div>
    );
  }
}
