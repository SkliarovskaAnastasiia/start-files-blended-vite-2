import { useEffect, useState } from 'react';
import { getPhotos } from '../apiService/photos';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Button from '../components/Button/Button';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const getQuery = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    loadMore(false);
  };

  useEffect(() => {
    (async () => {
      try {
        if (!query) return;
        setLoading(true);

        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          setIsEmpty(true);
          return;
        }

        setImages(prevImages => [...prevImages, ...photos]);
        setLoadMore(page < Math.ceil(total_results / per_page));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [query, page]);

  const handleBtnClick = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <>
      <Text textAlign="center">Let`s begin search 🔎</Text>
      <Form onSubmit={getQuery} />
      {loading && <Loader />}
      {error && <Text textAlign="center">Something went wrong!</Text>}
      {images.length > 0 && <PhotosGallery images={images} />}
      {isEmpty && <Text textAlign="center">Nothing found!</Text>}
      {loadMore && <Button onClick={handleBtnClick}>Load More</Button>}
    </>
  );
};

export default Photos;
