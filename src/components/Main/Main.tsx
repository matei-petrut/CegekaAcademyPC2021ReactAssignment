import React, { useState, useEffect } from 'react'
import * as api from '../../api/index';
import { Switch, Route } from 'react-router';
import { PhotoModel } from '../../models/PhotoModel';
import { PhotoList } from '../Photo/index';
import { AlbumModel } from '../../models/AlbumModel';
import AlbumList from '../Album/AlbumList';
import { Message } from 'semantic-ui-react';

const Main = () => {
    const [albums, setAlbums] = useState<AlbumModel[]>([]);
    const [photos, setPhotos] = useState<PhotoModel[]>([]);

    useEffect(() => {
        const localAlbums = localStorage.getItem('albums');
        const localPhotos = localStorage.getItem('photos');

        if (localPhotos && localAlbums) {
            setAlbums(JSON.parse(localAlbums));
            setPhotos(JSON.parse(localPhotos));
        } else {
            const internalAlbums = api.getAlbums();
            const internalPhotos = api.getPhotos();
            setAlbums(internalAlbums);
            setPhotos(internalPhotos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('albums', JSON.stringify(albums));
    }, [albums]);

    useEffect(() => {
        localStorage.setItem('photos', JSON.stringify(photos));
    }, [photos]);

    const createPhoto = (photo: PhotoModel) => {
        const timestamp = Date.now();
        photo.id = timestamp.toString();
        setPhotos(prevPhotos => [...prevPhotos, photo]);
    }

    const editPhoto = (key: string, updatedPhoto: PhotoModel) => {
        const updatedPhotos = photos.map(photo => photo.id === key ? updatedPhoto : photo);
        setPhotos(updatedPhotos);
    }

    const deletePhoto = (key: string) => {
        const remainingPhotos = photos.filter(photo => photo.id !== key);
        setPhotos(remainingPhotos);
    }

    const createAlbum = (album: AlbumModel) => {
        const timestamp = Date.now();
        album.id = `album-${timestamp.toString()}`;
        setAlbums(prevAlbums => [...prevAlbums, album]);
    }

    const editAlbum = (key: string, updatedAlbum: AlbumModel) => {
        const updatedAlbums = albums.map(album => album.id === key ? updatedAlbum : album);
        setAlbums(updatedAlbums);
    }

    const deleteAlbum = (key: string) => {
        const remainingAlbums = albums.filter(album => album.id !== key);
        setAlbums(remainingAlbums);
    }

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