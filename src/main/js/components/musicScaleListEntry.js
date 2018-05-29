import React from 'react';
import axios from 'axios';
import MusicScaleView from './musicScaleView';


export default class MusicscaleListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
        };
    }
}