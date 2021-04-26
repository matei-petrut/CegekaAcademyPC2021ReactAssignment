import { AlbumActionTypes } from '../actions/albumActionTypes';
import { AlbumModel } from '../models/AlbumModel';

export const albumReducer = (prevState: any, action: any) => {
    switch (action.type) {
        case AlbumActionTypes.CREATE_ALBUM: {
            const timestamp = Date.now();
            const album = action.album;
            album.id = `album-${timestamp}`;
            return [
                ...prevState,
                album
            ];
        }
        case AlbumActionTypes.EDIT_ALBUM: {
            const updatedAlbums = prevState.map((album: AlbumModel) => album.id === action.key ? action.updatedAlbum : album);
            return [
                ...updatedAlbums
            ];
        }
        case AlbumActionTypes.DELETE_ALBUM: {
            const remainingAlbums = prevState.filter((album: AlbumModel) => album.id !== action.key);
            return [
                ...remainingAlbums
            ];
        }
    }
}