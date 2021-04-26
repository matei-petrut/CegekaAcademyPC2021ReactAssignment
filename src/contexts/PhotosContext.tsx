import React, { useReducer, useEffect, createContext } from 'react'
import { PhotoModel } from '../models/PhotoModel';
import { photoReducer } from '../reducers/photoReducer';
import { PhotoActions } from '../actions/photoActionTypes';
import * as api from '../api/index';

let dispatcher = {
    createPhoto: (photo: PhotoModel) => {},
    editPhoto: (key: string, updatedPhoto: PhotoModel) => {},
    deletePhoto: (key: string) => {}
}

const loadState = () {
    const localPhotos = localStorage.getItem('photos');
    if (!localPhotos) return api.getPhotos();
    return JSON.parse(localPhotos);
}

export const PhotosContextProvider: React.FC = ({ children }) => {

    const [ photos, dispatch ] = useReducer(photoReducer, loadState());

    useEffect(() => {
        localStorage.setItem('photo', JSON.stringify(photos));
    }, [photos]);

    dispatcher = {
        createPhoto: (photo: PhotoModel) => {
            dispatch({
                type: PhotoActions.CREATE_PHOTO,
                photo
            })
        },
        editPhoto: (key: string, updatedPhoto) => {
            dispatch({
                type: PhotoActions.EDIT_PHOTO,
                key,
                updatedPhoto
            })
        },
        deletePhoto: (key: string) => {
            dispatch({
                type: PhotoActions.DELETE_PHOTO,
                key
            })
        }
    }

    const photosContext = {
        photos,
        ...dispatcher
    }

    return (
        <PhotosContext.Provider value={photosContext}>
            {children}
        </PhotosContext.Provider>
    );
}

export const PhotosContext = createContext({
    photos: loadState(),
    ...dispatcher
})
