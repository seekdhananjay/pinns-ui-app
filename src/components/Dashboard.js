import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress } from '@material-ui/core';
import Masonry from "react-masonry-component";

import { fetchAllImages } from "store/images.slice";
import { masonryOptions } from "components/masonry/exports";

const ImagesList = () => {
  const dispatch = useDispatch();
  const { images, isImagesLoading } = useSelector(state => state.images);
  useEffect(() => {
    dispatch(fetchAllImages());
  }, [dispatch]);
  return (
    <>
      {!isImagesLoading ? (
        <>
          <div>Total {images.length} images</div>
          <div style={{marginLeft: '25px'}}>
            <Masonry
                className={"grid"}
                elementType={"div"}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
              {images.map((img, i) => {
                  return (
                  <div key={i}>
                      <img src={img.link} style={{ width: 300 }} alt={img.name}/>
                  </div>
                  );
              })}
            </Masonry>
          </div>
        </>
      ) : (
        <div>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </div>
      )} 
    </>
  );
};

export default ImagesList;