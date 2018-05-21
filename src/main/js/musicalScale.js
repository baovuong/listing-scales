import React from 'react';

export default class MusicalScale extends React.Component {
    static noteMappings() {
        return [
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
        ]
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
            <h2>test</h2>
        )
    }
}