import React, { useState, useEffect } from 'react'
import * as api from '../../api/index';
import { Switch, Route } from 'react-router';
import { PhotoModel } from '../../models/PhotoModel';
import { PhotoList } from '../Photo/index';

const Main = () => {
    const [photos, setPhotos] = useState<PhotoModel[]>([]);

    useEffect(() => {
        const localPhotos = localStorage.getItem('photos');

        if (localPhotos) {
            setPhotos(JSON.parse(localPhotos));
        } else {
            const internalPhotos = api.getPhotos();
            setPhotos(internalPhotos);
        }
    }, []);


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

    return (
        <Switch>
            <Route path='/photos' render={photoList} />
        </Switch>
    )
}

export default Main;