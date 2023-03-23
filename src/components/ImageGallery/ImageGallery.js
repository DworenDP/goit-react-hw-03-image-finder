import { Component } from 'react';
import PropTypes from 'prop-types';

import { getImages } from 'srvices/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Error } from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export class ImageGallery extends Component {
  state = {
    images: [],
    status: STATUS.IDLE,
    pageNumber: 1,
    loadMore: null,
    showModal: false,
    largeImageUrl: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.inputValue;
    const nextName = this.props.inputValue;

    if (prevName !== nextName) {
      this.setState({ images: [], pageNumber: 1, status: STATUS.PENDING });
    }
    if (
      prevName !== nextName ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      getImages(nextName, this.state.pageNumber)
        .then(e => {
          this.setState(prevState => ({
            images: [...prevState.images, ...e],
            status: e.length === 0 ? STATUS.REJECTED : STATUS.RESOLVED,
            loadMore: 12 - e.length,
          }));
        })
        .catch(error => console.error(error));
    }
  }

  getLargeUrl = (imageUrl, tagNames) => {
    this.setState({ largeImageUrl: imageUrl, tags: tagNames });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  render() {
    const { images, status, loadMore, largeImageUrl, showModal, tags } =
      this.state;
    const { inputValue } = this.props;

    if (status === STATUS.RESOLVED) {
      return (
        <ImageGalleryItem images={images} loadLargeUrl={this.getLargeUrl}>
          {loadMore === 0 && <Button onLoadMore={this.handleLoadMore} />}
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              imgUrl={largeImageUrl}
              tags={tags}
            />
          )}
        </ImageGalleryItem>
      );
    }

    if (status === STATUS.REJECTED) {
      return <Error inputValue={inputValue} />;
    }

    if (status === STATUS.PENDING) {
      return <Loader />;
    }
  }
}

ImageGallery.propTypes = {
  inputValue: PropTypes.string.isRequired,
};