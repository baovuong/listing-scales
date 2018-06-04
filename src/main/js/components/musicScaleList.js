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
            query: ''
        };

        this.onView = this.viewScale.bind(this);
        this.onQueryInput = this.handleQueryInput.bind(this);
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

    searchScales(query, scales) {
        if (query == '') {
            return scales;
        }

        return scales.filter(scale => 
            scale.names.filter(name => 
                name.toLowerCase()
                    .includes(query.toLowerCase()))
                    .length > 0);
    }

    handleQueryInput(e) {
        this.setState({query: e.target.value});
    }


    render() {
        let scales = this.state.scales;
        let query = this.state.query;
        let selectedScale = this.state.selectedScale;
        return (
            <div id="musicScaleList">
                <input type="text" placeholder="search..." onInput={this.onQueryInput} />
                <div id="results">
                    {this.searchScales(query, scales).map(scale => 
                        <MusicScaleListEntry 
                            key={scale.id} 
                            scale={scale} 
                            isSelected={selectedScale == scale.id} 
                            view={this.onView} />)}
                </div>
            </div>
        )
    }

}