import React from 'react'
import { AlbumModel } from '../../models/AlbumModel';
import { PhotoModel } from '../../models/PhotoModel';
import { Button, Card, Icon } from 'semantic-ui-react';
import { DeleteButton, WithLightbox } from '../Common/index';
import StatusBar from '../StatusBar/StatusBar';
import Album from './Album';
import AlbumForm from './AlbumForm';

interface AlbumListProps {
    albums: AlbumModel[],
    photos: PhotoModel[],
    deleteAlbum: (index: string) => void,
    editAlbum: Function,
    createAlbum: Function
}

const AlbumList = ({ albums, photos, deleteAlbum, editAlbum, createAlbum }: AlbumListProps) => {
    
    const getAlbumPhotos = (album: AlbumModel) => {
        return photos.filter(photo => {
            return album.photosIds.includes(photo.id);
        });
    }

    const renderAlbums = () => {
        return (
            albums
            .map(album => {
                const albumPhotos = getAlbumPhotos(album);
                
                return (
                    <Album
                        key={album.id}
                        album={album}
                        albumPhotos={albumPhotos}
                    >
                        <AlbumForm 
                            formType="Edit"
                            index={album.id}
                            albumProp={album}
                            photos={photos}
                            editAlbum={editAlbum}
                            createAlbum={createAlbum}
                        />
                        <Button icon>
                            <WithLightbox
                                photos={albumPhotos}
                            >
                                <Icon name="play" />
                            </WithLightbox>
                        </Button>
                        <DeleteButton 
                            index={album.id}
                            objectName={album.name}
                            deleteObject={deleteAlbum}
                        />
                    </Album> 
                );
            })
        );
    }

    return (
        <div>
            <StatusBar title={`${albums.length} Album(s) total`}>
                <AlbumForm
                  photos={photos}  
                  formType='New'
                  createAlbum={createAlbum} 
                  index={''}
                  editAlbum={editAlbum}
                />
            </StatusBar>
            <Card.Group itemsPerRow={4} doubling>
                {renderAlbums()}
            </Card.Group>
        </div>
    )
}

export default AlbumList;
