import React from 'react';
import axios from 'axios';
import MusicScaleView from './musicScaleView';


export default class MusicscaleListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: props.scale,
        };
    }

    handleOnClick() {
        this.props.view(this.state.scale.id);
    };

    render() {
        let scale = this.state.scale;
        let isSelected = this.props.isSelected;
        return (
            <div onClick={this.handleOnClick.bind(this)}>
                {isSelected ? 'SELECTED: ' : ''} {scale.names.join(', ')}
            </div>
        )
    }
}