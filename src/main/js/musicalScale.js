import React from 'react';

export default class MusicalScale extends React.Component {
    static mapNote(value) {
        const thing = [
            'C',
            'C&#x266f;/D&#x266d;',
            'D',
            'D&#x266f;/E&#x266d;',
            'E',
            'F',
            'F&#x266f;/G&#x266d;',
            'G',
            'G&#x266f;/A&#x266d;',
            'A',
            'A&#x266f;/B&#x266d;',
            'B'
        ];

        return thing[value % 12];
    }

    constructor(props) {
        super(props);
        this.state = {
            root: 0,
            tones: 12,
            intervals: [],
            startingNote: 0,
            names: []
        };

    }

    render() {
        return (
            <div>
                <div>names: {names.join(',')}</div>
                <div>root: {MusicalScale.mapNote(root + startingNote)}</div>
                <div>notes: {intervals.map(_ => MusicalScale.mapNote(_ + root)).join(',')}</div>
            </div>
        )
    }
}