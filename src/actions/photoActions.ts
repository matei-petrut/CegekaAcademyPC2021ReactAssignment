import { PhotoModel } from '../models/PhotoModel';
import { PhotoActions } from './photoActionTypes';

export const createPhoto = (photo: PhotoModel) => {
    const timestamp = Date.now();
    const key = `photo-${timestamp}`;
    return {
        type: PhotoActions.CREATE_PHOTO,
        key,
        photo
    }
}

export const editPhoto = (key: string, updatedPhoto: PhotoModel) => {{
    type: PhotoActions.EDIT_PHOTO,
    key,
    updatedPhoto
}}

export const deletePhoto = (key: string) => {{
    type: PhotoActions.DELETE_PHOTO,
    key
}}