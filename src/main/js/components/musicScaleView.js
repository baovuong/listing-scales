import React from 'react';
import Vex from 'vexflow';

export default class MusicScaleView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startingNote: 0
        }

        this.renderer = null;
        this.stave = null;
        this.noteRenderingGroup = null;

    }

    render() {
        let scale = this.props.scale;
        let startingNote = this.state.startingNote;
        if (scale != null) {
            return (
                <div id="musicScaleView">
                    <select 
                        value={startingNote}
                        onChange={this.changeStartingNote.bind(this)}>
    
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
                    <div id={'scaleNotation'}></div>
                    <ul>
                        {scale.names.map((name, index) => 
                            <li key={index}>{name}</li>)}
                    </ul>
                </div>
            )
        }
        return (
            <div></div>
        )
    }

    changeStartingNote(e) {
        this.setState({startingNote: parseInt(e.target.value)});
    }

    componentDidMount() {
        if (this.props.scale != null) {
            let div = document.getElementById('scaleNotation');
            this.renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
            this.drawStaff(this.props.scale, this.state.startingNote);
        }
    }

    componentDidUpdate() {
        if (this.props.scale != null) {
            this.renderer.getContext().svg.removeChild(this.noteRenderingGroup);
            this.drawStaff(this.props.scale, this.state.startingNote);
        }
    }

    drawStaff(scale, startingNote) {
        let numNotes = this.props.scale.intervals.length;
        this.renderer.resize(100 * numNotes, 150);

        let context = this.renderer.getContext();

        this.noteRenderingGroup = context.openGroup();

        let stave = new Vex.Flow.Stave(5, 0, 60 * numNotes);
        stave.addClef("treble");
        stave.setContext(context).draw();

        let notes = this.toVexNotes(this.noteValues(scale.root + startingNote, scale.intervals));
        console.log(notes);
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        let voice = new Vex.Flow.Voice({num_beats: notes.length,  beat_value: 4});
        voice.addTickables(notes);
        let formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 50 * notes.length);
        voice.draw(context, stave);

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

    mapNote(value) {
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

}