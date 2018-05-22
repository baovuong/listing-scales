import React from 'react';
import axios from 'axios';
import MusicScaleView from './musicScaleView';

export default class MusicScaleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scales: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/scales?tones=12')
            .then(res => {
                const scales = res.data;
                this.setState({scales});
            });
    }

    render() {
        let scales = this.state.scales;
        return (
            <div>
                {scales.map(item => 
                    <MusicScaleView scale={scale} startingNote={0} />)}
            </div>
        )
    }

}