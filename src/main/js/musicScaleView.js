import React from 'react';
import Vex from 'vexflow';

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

    static mapVexNote(value) {
        const thing = [
            'c/4',
            'c#/4',
            'd/4',
            'd#/4',
            'e/4',
            'f/4',
            'f#/4',
            'g/4',
            'g#/4',
            'a/4',
            'a#/4',
            'b'
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
        let startingNote = this.props.startingNote;
        return (
            <div>
                <div>names: {scale.names.join(',')}</div>
                <div>notes: {this.noteValues(scale.root + startingNote, scale.intervals).map(value => MusicScaleView.mapNote(value)).join(', ')}</div>
                <div id={'scaleNotation' + scale.id}></div>
                <div>root: {MusicScaleView.mapNote(scale.root + startingNote)}</div>
            </div>
        )
    }

    componentDidMount() {
        var VF = Vex.Flow;
        let div = document.getElementById('scaleNotation' + this.state.scale.id);
        let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        //renderer.resize(500, 500);
        let context = renderer.getContext();
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        let stave = new VF.Stave(10, 40, 400);
        stave.addClef("treble").addTimeSignature("4/4");
        stave.setContext(context).draw();

        let notes = [new VF.StaveNote({clef: "treble", keys: [MusicScaleView.mapVexNote(this.props.startingNote)], duration: "w" })];
        let voice = new VF.Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(notes);
        //let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

        // Render voice
        voice.draw(context, stave);
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