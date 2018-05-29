import React from 'react';
import axios from 'axios';
import MusicScaleView from './musicScaleView';


export default class MusicscaleListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            scale: props.scale,
        };
    }

    render() {
        let scale = this.state.scale;
        return (
            <h2>
                {scale.names.join(', ')}
            </h2>
        )
    }
}