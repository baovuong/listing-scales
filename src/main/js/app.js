import React from 'react';
import ReactDOM from 'react-dom';
import VexFlow from 'vexflow';
import MusicScaleList from './components/musicScaleList';
import MusicScaleView from './components/musicScaleView';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedScale: null
        };
    }

    viewScale(scale) {
        this.setState({selectedScale: scale});
        console.log(this.state.selectedScale);
    }

    render() {
        let selectedScale = this.state.selectedScale;
        return (
            <div>
                <h1>All the Scales!</h1>
                {selectedScale != null &&
                <MusicScaleView scale={selectedScale} />}
                <MusicScaleList viewScale={this.viewScale.bind(this)} />
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('main')
);