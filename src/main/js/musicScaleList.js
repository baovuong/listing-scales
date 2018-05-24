import React from 'react';
import axios from 'axios';
import MusicScaleView from './musicScaleView';

export default class MusicScaleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scales: [],
            startingNote: '0'
        };
    }

    componentDidMount() {
        axios.get('/scales?tones=12')
            .then(res => {
                const scales = res.data;
                this.setState({scales});
            });
    }

    handleNoteChange(e) {
        this.setState({startingNote:e.target.value});
    }

    render() {
        let scales = this.state.scales;
        let startingNote = this.state.startingNote;
        return (
            <div>
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
                        <MusicScaleView scale={scale} startingNote={parseInt(startingNote)} />)}
                </div>
            </div>
        )
    }

}