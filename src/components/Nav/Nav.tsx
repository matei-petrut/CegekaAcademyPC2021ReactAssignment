import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    const [activeItem, setActiveItem] = useState('albums');

    const handleItemClick = (name: string) => { setActiveItem(name) }

    return (
        <Menu
            size='massive'
            tabular
        >
            <Menu.Item
                icon
            >
                <Icon name='images' size='big' />
            </Menu.Item>

            <Menu.Item
                name='albums'
                active={activeItem === 'albums'}
                onClick={() => handleItemClick('albums')}
                as={NavLink}
                to={'/albums'}
            >
                Albums
            </Menu.Item>

            <Menu.Item
                name='photos'
                active={activeItem === 'photos'}
                onClick={() => handleItemClick('photos')}
                as={NavLink}
                to={'/photos'}
            >
                Photos
            </Menu.Item>
        </Menu>
    );
}

export default Nav;