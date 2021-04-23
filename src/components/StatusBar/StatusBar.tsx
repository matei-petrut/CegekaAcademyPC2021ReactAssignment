import React from 'react'
import { Grid, Segment } from 'semantic-ui-react';

interface StatusBarProps {
    title: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ title , children }) => {
    return (
        <Grid columns={2}>
            <Grid.Column textAlign="center">
                <Segment basic>
                    {title}
                </Segment>
            </Grid.Column>
            <Grid.Column textAlign="right">
                <Segment basic>
                    {children}
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default StatusBar;