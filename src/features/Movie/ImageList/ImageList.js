import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";

import { MOVIE_DB_IMAGE_URL } from "@/api/apiMovies";
import { Spinner } from "reactstrap";
import actions from "../actions";

import "react-image-gallery/styles/scss/image-gallery.scss";

class ImageList extends Component {
  componentDidMount() {
    const { match, getImages } = this.props;
    getImages(match.params.movie_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.movie_id !== prevProps.match.params.movie_id) {
      const { match, getImages } = this.props;
      getImages(match.params.movie_id);
    }
  }

  render() {
    const { images } = this.props;

    if (!images.data) return <Spinner />;

    const imagesForGallery = images.data.map(img => ({
      original: MOVIE_DB_IMAGE_URL.original + img.file_path,
      thumbnail: MOVIE_DB_IMAGE_URL.small + img.file_path
    }));

    return imagesForGallery.length > 0 ? (
      <div className="movie-gallery">
        <h3 className="list-title mb-4">Gallery</h3>
        <ImageGallery items={imagesForGallery} />
      </div>
    ) : null;
  }
}

ImageList.propTypes = {
  images: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      movie_id: PropTypes.string.isRequired,
    })
  })
}

const mapStateToProps = ({ movieDetails }) => ({
  images: movieDetails.images
});

const mapDispatchToProps = dispatch => ({
  getImages: id => dispatch(actions.getImages(id))
});

const connectedImageList = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImageList)
);

export default connectedImageList;

export { connectedImageList as ImageList };
