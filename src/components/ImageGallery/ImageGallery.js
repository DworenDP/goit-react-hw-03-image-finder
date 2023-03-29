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
    isLoadingMore: false,
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
      isLoadingMore: true,
    }));
  };

  reset = () => {
    this.setState({ images: [], pageNumber: 1, status: STATUS.PENDING });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.inputValue;
    const nextName = this.props.inputValue;

    if (prevName !== nextName) {
      this.reset();
      const { pageNumber } = this.state;
      if (pageNumber === 1) {
        getImages(nextName, pageNumber)
          .then(e => {
            this.setState({
              images: [...e],
              status: e.length === 0 ? STATUS.REJECTED : STATUS.RESOLVED,
              loadMore: 12 - e.length,
              isLoadingMore: false,
            });
          })
          .catch(error => console.error(error));
      }
    }
    if (prevState.pageNumber !== this.state.pageNumber) {
      const { pageNumber } = this.state;
      getImages(nextName, pageNumber)
        .then(e => {
          this.setState(prevState => ({
            images: [...prevState.images, ...e],
            status: e.length === 0 ? STATUS.REJECTED : STATUS.RESOLVED,
            loadMore: 12 - e.length,
            isLoadingMore: false,
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

  render() {
    const {
      images,
      status,
      loadMore,
      largeImageUrl,
      showModal,
      tags,
      isLoadingMore,
    } = this.state;
    const { inputValue } = this.props;

    if (status === STATUS.RESOLVED) {
      return (
        <ImageGalleryItem images={images} loadLargeUrl={this.getLargeUrl}>
          {loadMore === 0 &&
            (isLoadingMore ? (
              <Loader />
            ) : (
              <Button onLoadMore={this.handleLoadMore} />
            ))}
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
