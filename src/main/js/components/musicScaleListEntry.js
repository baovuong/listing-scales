import React from 'react';
import axios from 'axios';
import MusicScaleView from './musicScaleView';


export default class MusicscaleListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: props.scale,
        };

        this.onClickEvent = this.onClickThing.bind(this);
    }

    onClickThing() {
        this.props.view(this.state.scale.id);
    };
    render() {
        let scale = this.state.scale;
        let isSelected = this.props.isSelected;
        return (
            <div onClick={this.onClickEvent}>
                <h2>{scale.names.join(', ')}</h2>
            </div>
        )
    }
}