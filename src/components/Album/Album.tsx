import React from 'react';
import './Album.css';
import { PhotoModel } from '../../models/PhotoModel';
import { AlbumModel } from '../../models/AlbumModel';
import { Card, Image, Icon, Label, Button } from 'semantic-ui-react';

interface AlbumProps {
    album: AlbumModel;
    albumPhotos: PhotoModel[];
}

const Album: React.FC<AlbumProps> = ({ album, albumPhotos, children }) => {

    const showPreviewImages = () => {
        return (
            albumPhotos
            .filter((photo, index) => photo && index < 4)
            .map((photo, index) => {
                return <Image key={index} src={photo.url} />
            })
        );
    };

    const loadTags = () => {
        return (
            album.tags
            .map((tag, index) => {
                return <Label key={index}>{tag}</Label>
            })
        );
    };

    return (
        <Card>
            <Card.Content className="header">
                <Card.Header textAlign="left">
                    {album.name}
                </Card.Header>
                <Label attached="top right">
                    <Icon name="photo" /> {albumPhotos.length}
                </Label>
            </Card.Content>
            <Card.Content className="photos-container">
                <Image.Group size="tiny" className="photos-container">
                    {showPreviewImages()}
                </Image.Group>
            </Card.Content>
            <Card.Content>
                <Card.Description textAlign="center" as="p">
                    {album.description}
                </Card.Description>
                <Card.Description textAlign="center">
                    <Label.Group tag size="tiny">
                        {loadTags()}
                    </Label.Group>
                </Card.Description>
            </Card.Content>
            <Button.Group attached="bottom" basic>
                {children}
            </Button.Group>
        </Card>
    );
}

export default Album;
