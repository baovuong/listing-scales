import React from 'react';
import axios from 'axios';
import Foundation from 'react-foundation';
import MusicScaleView from './musicScaleView';
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

    handleNoteChange(e) {
        this.setState({startingNote:e.target.value});
    }

    viewScale(id) {
        this.setState({selectedScale: id});
    }


    render() {
        let scales = this.state.scales;
        let startingNote = this.state.startingNote;
        let selectedScale = this.state.selectedScale;
        return (
            <div>
                {selectedScale != 0 &&
                    <MusicScaleView 
                        scale={scales.filter(scale => scale.id == selectedScale)[0]} 
                        startingNote={parseInt(startingNote)} />
                }
                <select 
                    value={startingNote}
                    onChange={this.handleNoteChange.bind(this)}>

                    <option value="0">C</option>
                    <option value="1">C&#9839;/D&#9837;</option>
                    <option value="2">D</option>
                    <option value="3">D&#9839;/E&#9837;</option>
                    <option value="4">E</option>
                    <option value="5">F</option>
                    <option value="6">F&#9839;/G&#9837;</option>
                    <option value="7">G</option>
                    <option value="8">G&#9839;/A&#9837;</option>
                    <option value="9">A</option>
                    <option value="10">A&#9839;/B&#9837;</option>
                    <option value="11">B</option>
                </select>


                <div id="musicScaleList">
                    {scales.map(scale => 
                        <MusicScaleListEntry 
                            key={scale.id} 
                            scale={scale} 
                            isSelected={selectedScale == scale.id} 
                            view={this.viewScaleEvent} />)}
                </div>

                <Menu isVertical>
                    {scales.map(scale => 
                        <MusicScaleListEntry 
                            key={scale.id} 
                            scale={scale} 
                            isSelected={selectedScale == scale.id} 
                            view={this.viewScaleEvent} />)}
                </Menu>
            </div>
        )
    }

}