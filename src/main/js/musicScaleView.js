import React from 'react';

export default class MusicScaleView extends React.Component {
    static mapNote(value) {
        const thing = [
            'C',
            'C' + String.fromCharCode(9839) + '/D' + String.fromCharCode(9837),
            'D',
            'D' + String.fromCharCode(9839) + '/E' + String.fromCharCode(9837),
            'E',
            'F',
            'F' + String.fromCharCode(9839) + '/G' + String.fromCharCode(9837),
            'G',
            'G' + String.fromCharCode(9839) + '/A' + String.fromCharCode(9837),
            'A',
            'A' + String.fromCharCode(9839) + '/B' + String.fromCharCode(9837),
            'B'
        ];

        return thing[value % 12];
    }

    constructor(props) {
        super(props);
        this.state = {
            scale: props.scale,
            startingNote: props.startingNote,
        };

    }

    render() {
        let scale = this.state.scale;
        let startingNote = this.state.startingNote;
        return (
            <div>
                <div>names: {scale.names.join(',')}</div>
                <div>notes: {this.noteValues(scale.root, scale.intervals).map(value => MusicScaleView.mapNote(value)).join(', ')}</div>
                <div>root: {MusicScaleView.mapNote(scale.root + startingNote)}</div>
            </div>
        )
    }

    componentDidMount() {
        
    }

    noteValues(root, intervals) {
        let intervalLength = intervals.length;
        let result = [];
        for (var i=0; i<intervalLength; i++) {
            result.push(root);
            root += intervals[i];
        }

        return result;
    }
}