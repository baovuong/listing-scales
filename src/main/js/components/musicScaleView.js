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

    static toVexNote(value, VF) {
        let note = MusicScaleView.mapVexNote(value);
        let rendering = new VF.StaveNote({clef: "treble", keys: [MusicScaleView.mapVexNote(value)], duration: "q" });
        if (note.includes('#')) {
            return rendering.addAccidental(0, new VF.Accidental('#'));
        }
        return rendering;
    }

    constructor(props) {
        super(props);
        this.state = {
            scale: props.scale,
            startingNote: props.startingNote,
        };

        this.renderer = null;
        this.stave = null;
        this.noteRenderingGroup = null;

    }

    render() {
        let scale = this.state.scale;
        let startingNote = this.props.startingNote;
        return (
            <div>
                <div>{scale.names.join(', ')}</div>
                <div id={'scaleNotation' + scale.id}></div>
            </div>
        )
    }

    componentDidMount() {
        let numNotes = this.state.scale.intervals.length;
        let div = document.getElementById('scaleNotation' + this.state.scale.id);
        this.renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
        this.renderer.resize(100 * numNotes, 200);
        this.stave = new Vex.Flow.Stave(10, 40, 60 * numNotes);
        this.stave.addClef("treble");
        this.stave.setContext(this.renderer.getContext()).draw();
        this.drawStaff(this.state.scale, this.props.startingNote);
    }

    componentDidUpdate() {
        this.renderer.getContext().svg.removeChild(this.noteRenderingGroup);
        this.drawStaff(this.state.scale, this.props.startingNote);
    }

    drawStaff(scale, startingNote) {
        let context = this.renderer.getContext();
        let notes = this.toVexNotes(this.noteValues(scale.root + startingNote, scale.intervals));
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        let voice = new Vex.Flow.Voice({num_beats: notes.length,  beat_value: 4});
        voice.addTickables(notes);
        let formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 50 * notes.length);
        this.noteRenderingGroup = context.openGroup();
        voice.draw(context, this.stave);
        context.closeGroup();
    }

    noteValues(root, intervals) {
        let intervalLength = intervals.length;
        let result = [];
        for (let i=0; i<intervalLength; i++) {
            result.push(root);
            root += intervals[i];
        }

        return result;
    }

    toVexNotes(noteValues) {
        const keys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
        let octave = 4;
        return noteValues.map(value => {
            let note = keys[value % 12] + '/' + (value / 12 + octave);
            let rendering = new Vex.Flow.StaveNote({clef: "treble", keys: [note], duration: "q" });
            if (note.includes('#')) {
                return rendering.addAccidental(0, new Vex.Flow.Accidental('#'));
            }
            return rendering;
        });
    }
}