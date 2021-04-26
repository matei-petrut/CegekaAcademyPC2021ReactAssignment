import React, { useContext } from 'react'
import { Switch, Route } from 'react-router';
import { PhotoList } from '../Photo/index';
import AlbumList from '../Album/AlbumList';
import { Message } from 'semantic-ui-react';
import { AlbumsContext } from '../../contexts/AlbumsContext';
import { PhotosContext } from '../../contexts/PhotosContext';

const Main = () => {
    const { albums, createAlbum, editAlbum, deleteAlbum } = useContext(AlbumsContext);
    const { photos, createPhoto, editPhoto, deletePhoto } = useContext(PhotosContext);
    
    const photoList = () => {
        return (
            <PhotoList 
                photos={photos}
                deletePhoto={deletePhoto}
                createPhoto={createPhoto}
                editPhoto={editPhoto}
            />
        );
    }

    const albumsList = () => {
        return (
            <AlbumList 
                albums={albums}
                photos={photos}
                deleteAlbum={deleteAlbum}
                editAlbum={editAlbum}
                createAlbum={createAlbum}
            />
        );
    }

    const errorMessage = () => {
        return (
            <Message 
                icon='warning circle'
                header='Error!'
                content='Please try again.'
            />
        );
    }

    return (
        <Switch>
            <Route exact path='/' component={albumsList} />
            <Route path='/photos' render={photoList} />
            <Route path='/albums' render={albumsList} />
            <Route render={errorMessage} />
        </Switch>
    )
}

export default Main;