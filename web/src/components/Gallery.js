import React from "react";
import GalleryGrid from "react-grid-gallery";
import qs from "query-string";
import assetService from "../services/assets";
import Header from "./shared/Header";

import { Navbar, NavItem } from "reactstrap";

export default class Gallery extends React.Component {
  state = { tag: "", assets: new Array(), overallPages: 0, currentPage: 0 };

  componentDidMount() {
    const { location } = this.props;
    const params = qs.parse(location.search);
    this.setState({ tag: params.tag });
    this.fetchAssets(params);
  }

  componentWillReceiveProps = (next, prevState) => {
    const { search } = next.location;
    const params = qs.parse(search);
    this.fetchAssets(params);
  };

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
    const selected = assets.filter((_, i) => assets[i].isSelected);
    return selected;
  };

  next = () => {
    const { currentPage, overallPages } = this.state;
    if (currentPage < overallPages) {
      const { location } = this.props;
      const params = qs.parse(location.search);
      let { tag, page } = params;

      this.props.history.push(`/assets?tag=${tag}&page=${parseInt(page) + 1}`);
    }
  };

  previous = () => {
    const { currentPage, overallPages } = this.state;
    if (currentPage >= overallPages && currentPage > 0) {
      const { location } = this.props;
      const params = qs.parse(location.search);
      let { tag, page } = params;

      this.props.history.push(`/assets?tag=${tag}&page=${parseInt(page) - 1}`);
    }
  };

  download = async () => {
    const { tag } = this.state;
    const selected = this.selectedImages();
    if (selected.length <= 0) return alert("No assets selected.");

    const assets = selected.map(
      ({ _id, filename }) => _id && { id: _id, filename }
    );

    try {
      await assetService.download(assets, tag);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { tag, assets, overallPages, currentPage } = this.state;

    // const galleryAssets = assets.map(i => {thumbnailWidth:500, thumbnailHeight:500, tags:i.tags, })
    return (
      <div className="gallery">
        {assets.length <= 0 && <Header text="0 assets found." />}

        {assets.length > 0 && (
          <React.Fragment>
            <Header tag={tag} download={this.download} />
            <Header>
              <Navbar>
                <NavItem className="direction" onClick={this.previous}>
                  previous
                </NavItem>
                <NavItem>{currentPage + 1 + "/" + (overallPages + 1)}</NavItem>
                <NavItem className="direction" onClick={this.next}>
                  Next
                </NavItem>
              </Navbar>
            </Header>
            <GalleryGrid
              images={assets}
              onSelectImage={this.onSelectImage}
              backdropClosesModal={true}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
