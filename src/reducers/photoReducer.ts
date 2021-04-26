import { PhotoActions } from '../actions/photoActionTypes';
import { PhotoModel } from '../models/PhotoModel';

export const photoReducer = (prevState: any, action: any) => {
    switch(action.type) {
        case PhotoActions.CREATE_PHOTO: {
            const timestamp = Date.now();
            const photo = action.photo;
            photo.id = `photo-${timestamp}`;
            return [
                ...prevState,
                photo
            ]
        }
        case PhotoActions.EDIT_PHOTO: {
            const updatedPhotos = prevState.map((photo: PhotoModel) => {
                return photo.id === action.key ? action.updatedPhoto : photo;
            })
            return [
                ...updatedPhotos
            ]
        }
        case PhotoActions.DELETE_PHOTO: {
            const remainingPhotos = prevState.filter((photo: PhotoModel) => {
                return photo.id !== action.key;
            })
            return [
                ...remainingPhotos
            ]
        }
    }
}