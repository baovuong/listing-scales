import React from 'react';
import axios from 'axios';
import MusicScaleListEntry from './musicScaleListEntry';

export default class MusicScaleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scales: [],
            startingNote: '0',
            selectedScale: 0,
        };

        this.viewScaleEvent = this.viewScale.bind(this);
    }

    componentDidMount() {
        axios.get('/api/scales?tones=12')
            .then(res => {
                const scales = res.data;
                this.setState({scales});
            });
    }

    viewScale(id) {
        let scales = this.state.scales;
        let newScale = scales.filter(scale => scale.id == id)[0];

        this.setState({selectedScale: id});
        this.props.viewScale(newScale);
    }


    render() {
        let scales = this.state.scales;
        //let startingNote = this.state.startingNote;
        let selectedScale = this.state.selectedScale;
        return (
            <div>
                {/* {selectedScale != 0 &&
                    <MusicScaleView 
                        scale={scales.filter(scale => scale.id == selectedScale)[0]} 
                        startingNote={parseInt(startingNote)} />
                } */}
                <div>
                    {scales.map(scale => 
                        <MusicScaleListEntry 
                            key={scale.id} 
                            scale={scale} 
                            isSelected={selectedScale == scale.id} 
                            view={this.viewScaleEvent} />)}
                </div>
            </div>
        )
    }

}