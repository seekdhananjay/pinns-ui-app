import { createSlice } from '@reduxjs/toolkit'
import { api } from 'api/index'
import { getLoggedInUserInfo } from 'utils/index';

const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        images: [],
        isImagesLoading: false,
        error: false
    },
    reducers: {
        startLoadingImages: state => {
            state.isImagesLoading = true;
        },
        hasImagesLoadingError: (state, action) => {
            state.error = action.payload;
            state.isImagesLoading = false;
        },
        imagesLoadedSuccessfully: (state, action) => {
            state.images = action.payload;
            state.isImagesLoading = false;
        },
    },
});

export default imagesSlice.reducer;


const { startLoadingImages, imagesLoadedSuccessfully, hasImagesLoadingError } = imagesSlice.actions

// any random number between min (included) and max (not included):
const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
};
const width = 237;
const heightArray = [239, 429, 355, 249, 237, 505, 740, 315, 354, 583, 330, 255];
                
const getCurrentUserId = () => {
    const currentUser = getLoggedInUserInfo();
    if(currentUser) return currentUser.userId;
    return null;
}
const getUserImagesUrl = `/pin/users/${getCurrentUserId()}/images`;
const getImagesUrl = `/pin/images`;
export const fetchImages = () => async dispatch => {
    dispatch(startLoadingImages());
    try {
       await api.get(getUserImagesUrl)
           .then((response) => {
                const allImages = response.data.data.map(image=> {
                    return {
                        ...image,
                        width: width,
                        height: heightArray[getRandomIndex(heightArray.length)]
                    };
                });
                console.info('allImages: ', allImages);
                dispatch(imagesLoadedSuccessfully(allImages))
           })
    }
    catch (e) {
        // return console.error(e.message);
        dispatch(hasImagesLoadingError(e.message))
    }
}
export const fetchImagesAuthWise = (authStatus) => async dispatch => {
    let imageUrl = `/pin/images`;
    dispatch(startLoadingImages());
    if(authStatus) imageUrl = `/pin/users/${getCurrentUserId()}/images`;
    try {
       await api.get(imageUrl)
           .then((response) => {
                const allImages = response.data.data.map(image=> {
                    return {
                        ...image,
                        width: width,
                        height: heightArray[getRandomIndex(0, heightArray.length)]
                    };
                });
                console.info('allImages: ', allImages);
                dispatch(imagesLoadedSuccessfully(allImages))
           })
    }
    catch (e) {
        // return console.error(e.message);
        dispatch(hasImagesLoadingError(e.message))
    }
}
export const fetchImagesByUserId = (userId) => async dispatch => {
    let imageUrl = `/pin/images`;
    dispatch(startLoadingImages());
    if(userId) imageUrl = `/pin/users/${userId}/images`;
    try {
       await api.get(imageUrl)
           .then((response) => {
                const allImages = response.data.data.map(image=> {
                    const randomIndex = getRandomIndex(heightArray.length);
                    return {
                        ...image,
                        width: width,
                        height: heightArray[randomIndex]
                    };
                });
                console.info('allImages: ', allImages);
                dispatch(imagesLoadedSuccessfully(allImages))
           })
    }
    catch (e) {
        // return console.error(e.message);
        dispatch(hasImagesLoadingError(e.message))
    }
}

export const fetchAllImages = () => async dispatch => {
    dispatch(startLoadingImages());
    try {
       await api.get(getImagesUrl)
           .then((response) => {
                const allImages = response.data.data.map(image=> {
                    return {
                        ...image,
                        width: width,
                        height: heightArray[getRandomIndex(0, heightArray.length)]
                    };
                });
                console.info('allImages: ', allImages);
                dispatch(imagesLoadedSuccessfully(allImages))
           })
    }
    catch (e) {
        // return console.error(e.message);
        dispatch(hasImagesLoadingError(e.message))
    }
}

export const deleteUserImageById = (userId, imageId) => async dispatch => {
    console.info('delete userId, imageId: ', userId, imageId);
    const url = `/pin/users/${userId}/images/${imageId}`;
    
    try {
        await api.delete(url)
            .then((response) => {
                 console.info(`${imageId} is deleted`);
                 console.info(response);
                 if(response.data.data !== null){
                    dispatch(fetchImagesByUserId(userId));
                 } else {
                     console.info('image not deleted');
                 }
            })
     }
     catch (e) {
         console.error(e.message);
     }
};
