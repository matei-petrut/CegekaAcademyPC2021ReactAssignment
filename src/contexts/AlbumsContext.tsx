import React, { useReducer, useEffect, createContext } from 'react'
import { AlbumModel } from '../models/AlbumModel';
import { albumReducer } from '../reducers/albumReducer';
import { AlbumActionTypes as AlbumActions } from '../actions/albumActionTypes';
import * as api from '../api/index';

let dispacher = {
    createAlbum: (album: AlbumModel) => {},
    editAlbum: (key: string, updatedAlbum: AlbumModel) => {},
    deleteAlbum: (key: string) => {}
}

const loadState = () => {
    const localAlbums = localStorage.getItem('albums');
    if (!localAlbums) return api.getAlbums();
    return JSON.parse(localAlbums);
}

export const AlbumsContextProvider: React.FC = ({ children }) => {

    const [albums, dispatch] = useReducer(albumReducer, loadState());

    useEffect(() => {
        localStorage.setItem('albums', JSON.stringify(albums));
    }, [albums]);

    dispacher = {
        createAlbum: (album: AlbumModel) => {
            dispatch({
                type: AlbumActions.CREATE_ALBUM,
                album: album
            })
        },
        editAlbum: (key: string, updatedAlbum: AlbumModel) => {
            dispatch({
                type: AlbumActions.EDIT_ALBUM,
                key: key,
                updatedAlbum: updatedAlbum
            })
        },
        deleteAlbum: (key: string) => {
            dispatch({
                type: AlbumActions.DELETE_ALBUM,
                key: key
            })
        }
    };

    const albumsContext = {
        albums,
        ...dispacher
    };

    return (
        <AlbumsContext.Provider value={albumsContext}>
            {children}
        </AlbumsContext.Provider>
    );
}

export const AlbumsContext = createContext({
    albums: loadState(),
    ...dispacher
});
