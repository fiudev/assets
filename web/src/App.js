import React from "react";

import Gallery from "./components/shared/Gallery";
import Header from "./components/shared/Header";
import { Container } from "reactstrap";

import assetService from "./services/assets";

class App extends React.Component {
  state = {
    assets: [
      {
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail:
          "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)"
      },
      {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail:
          "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [
          { value: "Ocean", title: "Ocean" },
          { value: "People", title: "People" }
        ],
        caption: "Boats (Jeshu John - designerspics.com)"
      },

      {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail:
          "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
      }
    ]
  };

  componentDidMount() {
    this.fetchAssets();
  }

  fetchAssets = async () => {
    const assets = await assetService.read();
  };

  search = async searchValue => {
    const assets = await assetService.read(searchValue);
    console.log(assets);
  };

  render() {
    const { assets } = this.state;
    return (
      <React.Fragment>
        <Container>
          {/* <Header search={searchValue => this.search(searchValue)} /> */}
          <Gallery assets={assets} />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
