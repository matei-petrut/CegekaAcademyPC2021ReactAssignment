import { AlbumModel } from '../models/AlbumModel';
import { AlbumActionTypes as albumActions } from './albumActionTypes';

export const createAlbum = (album: AlbumModel) => {
    const timestamp = Date.now();
    const key = `album-${timestamp}`;
    return {
        type: albumActions.CREATE_ALBUM,
        album,
        key
    }
}

export const editAlbum = (key: string, updatedAlbum: AlbumModel) => ({
    type: albumActions.EDIT_ALBUM,
    key,
    updatedAlbum
})

export const deleteAlbum = (key: string) => ({
    type: albumActions.DELETE_ALBUM,
    key
})