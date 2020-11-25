import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Masonry from "react-masonry-component";

import DeleteImageDialog from 'components/DeleteImageDialog'
import { fetchImagesByUserId } from "store/images.slice";
import { masonryOptions } from "components/masonry/exports";
import 'components/UserDashboard.css';


const ImagesList = ({user}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { images, isImagesLoading } = useSelector(state => state.images);
  useEffect(() => {
    dispatch(fetchImagesByUserId(user.userId));
  }, [dispatch]);
  
  const handleDialogClose = () => {
    setOpen(false);
  };

  const addDeleteIconClickHandler = () => {
      setOpen(true);
  };

  return (
    <>
      {!isImagesLoading ? (
        <>
          <div>{images.length} Your's images</div>
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
                  <div key={i} class="image-area">
                      <img src={img.link} style={{ width: 300 }} alt={img.name}/>
                      <div class="image-actions">
                        <DeleteForeverIcon style={{ fontSize: 50 }} onClick={()=>{addDeleteIconClickHandler();}}/>
                        <div style={{display: 'inline-block'}}>
                            {open && <DeleteImageDialog openStatus={open} setOpenStatus={handleDialogClose} user={user} image={img} />}
                        </div>
                      </div>
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