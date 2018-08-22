import React from 'react';
import Vex from 'vexflow';

export default class StandardNotationDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.renderer = null;
        this.stave = null;
        this.noteRenderingGroup = null;


    }

    render() {
        return (
            <div id={'standardNotationDisplay'}>
            </div>
        )
    }

    componentDidMount() {
        let div = document.getElementById('standardNotationDisplay');
        this.renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
        if (this.props.scale != null) {
            this.drawStaff(this.props.scale, this.props.startingNote, this.props.useFlats);
        }
    }

    componentDidUpdate() {
        if (this.props.scale != null) {
            if (this.noteRenderingGroup != null)
                this.renderer.getContext().svg.removeChild(this.noteRenderingGroup);
            this.drawStaff(this.props.scale, this.props.startingNote, this.props.useFlats);
        }
    }

    drawStaff(scale, startingNote, useFlats) {
        let numNotes = this.props.scale.intervals.length;
        
        this.renderer.resize(63 * numNotes, 120);


        let context = this.renderer.getContext();

        this.noteRenderingGroup = context.openGroup();

        let stave = new Vex.Flow.Stave(5, 0, 60 * numNotes);
        stave.addClef("treble");
        stave.setContext(context).draw();

        let notes = this.toVexNotes(this.noteValues(scale.root + startingNote, scale.intervals), useFlats);
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        let voice = new Vex.Flow.Voice({num_beats: notes.length,  beat_value: 4});
        voice.addTickables(notes);

        let noteLetters = this.toVexLetterNotes(this.noteValues(scale.root + startingNote, scale.intervals), stave, useFlats);
        let voice2 = new Vex.Flow.Voice({num_beats: notes.length, beat_value: 4});
        voice2.addTickables(noteLetters);

        let formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).format([voice, voice2], 50 * notes.length);

        voice.draw(context, stave);
        noteLetters.forEach(letter => letter.setContext(context).draw());


        context.closeGroup();
    }

    noteValues(root, intervals) {
        let intervalLength = intervals.length;
        let result = new Array(intervalLength);
        for (let i=0; i<intervalLength; i++) {
            result[i] = root;
            root += intervals[i];
        }

        return result;
    }

    toVexNotes(noteValues, useFlats) {
        const keys = ['c','c#db','d','d#eb','e','f','f#gb','g','g#ab','a','a#bb','b'];
        let octave = 4;

        return noteValues.map(value => {
            let note = keys[value % 12];
            let hasAccidental = note.includes('#');
            
            if (hasAccidental)
                note = useFlats ? note.substring(2) : note.substring(0, 2);

            note += '/' + (value / 12 + octave);
            
            let rendering = new Vex.Flow.StaveNote({clef: "treble", keys: [note], duration: "q" });
            if (hasAccidental) {
                return rendering.addAccidental(0, new Vex.Flow.Accidental(useFlats ? 'b' : '#'));
            }
            return rendering;
        });
    }

    toVexLetterNotes(noteValues, stave, useFlats) {
        return noteValues.map(value => {
            let note = this.mapNote(value);

            if (note.includes('/')) 
                note = useFlats ? note.substring(3) : note.substring(0, 2);
            
            let rendering = new Vex.Flow.TextNote({
                text: note,
                font: {
                    family: 'Arial',
                    size: 12,
                    weight: ''
                },
                duration: 'q'
            })
            .setLine(11)
            .setStave(stave)
            .setJustification(Vex.Flow.TextNote.Justification.LEFT);

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