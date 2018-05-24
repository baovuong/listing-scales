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
            'b/4'
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
        this.drawStaff(this.state.scale, this.props.startingNote, false);
    }

    componentDidUpdate() {
        this.drawStaff(this.state.scale, this.props.startingNote, true);
    }

    drawStaff(scale, startingNote, clearIt) {
        let VF = Vex.Flow;
        let div = document.getElementById('scaleNotation' + this.state.scale.id);

        if (clearIt) {
            while (div.hasChildNodes()) {
                div.removeChild(div.lastChild);
            }
        }


        let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        let context = renderer.getContext();


        // let notes = [
        //     new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
        //     new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
        //     new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
        //     new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
        //     new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
        //     new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
        //     new VF.StaveNote({ keys: ["c/4"], duration: "q" })
        //   ];
          
        let notes = this.noteValues(scale.root + startingNote, scale.intervals).map(n => MusicScaleView.toVexNote(n, VF));
          
          
          // Configure the rendering context.
          renderer.resize(100 * notes.length, 200);
          context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
          
          // Create a stave of width 400 at position 10, 40 on the canvas.
          let stave = new VF.Stave(10, 40, 60 * notes.length);
          
          // Add a clef and time signature.
          stave.addClef("treble");
          
          // Connect it to the rendering context and draw!
          stave.setContext(context).draw();
          
          // Create a voice in 4/4 and add above notes
          let voice = new VF.Voice({num_beats: notes.length,  beat_value: 4});
          voice.addTickables(notes);
          
          // Format and justify the notes to 400 pixels.
          let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 50 * notes.length);

        // Render voice
        voice.draw(context, stave);
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
}