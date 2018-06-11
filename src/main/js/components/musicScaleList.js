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
            query: '',
        };

        this.queryOnHold = '';
        this.timer = null;

        this.onView = this.viewScale.bind(this);
        this.onQueryInput = this.handleQueryInput.bind(this);
        this.onTimeout = this.handleTimeout.bind(this);
    }

    componentDidMount() {
        axios.get('/api/scales?tones=12')
            .then(res => {
                const scales = res.data;
                scales.forEach(s => {
                    s.searchableNames = s.names
                        .map(n => n.toLowerCase())
                        .reduce((a, b) => a + b);
                });

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
        query = query.toLowerCase();
        let results = scales
            .filter(s => s.searchableNames.indexOf(query) >= 0);
        return results;
            


    }

    handleQueryInput(e) {
        this.queryOnHold = e.target.value;

        this.timer = setTimeout(this.onTimeout, this.props.isMobile ? 800 : 300);
    }

    handleTimeout() {
        clearTimeout(this.timer);
        console.log('doing the thing now');
        this.setState({query: this.queryOnHold});
    }

    render() {
        let scales = this.state.scales;
        let query = this.state.query;
        let selectedScale = this.state.selectedScale;
        return (
            <div>
                <input type="text" placeholder="search..." onInput={this.onQueryInput} />
                <ul id="results">
                    {this.searchScales(query, scales).map(scale => 
                        <MusicScaleListEntry 
                            key={scale.id} 
                            scale={scale} 
                            isSelected={selectedScale == scale.id} 
                            view={this.onView} />)}
                </ul>
            </div>
        )
    }

}