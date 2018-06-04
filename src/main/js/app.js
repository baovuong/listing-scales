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

        this.onViewScale = this.viewScale.bind(this);
    }

    viewScale(scale) {
        this.setState({selectedScale: scale});
    }

    render() {
        let selectedScale = this.state.selectedScale;
        return (
            <div>
                <div className="grid-x">
                    <div className="cell small-2 medium-4 large-4">
                        <MusicScaleList viewScale={this.onViewScale} />
                    </div>
                    <div className="cell small-10 medium-8 large-8">
                        {selectedScale != null &&
                        <MusicScaleView scale={selectedScale} />}
                    </div>
                </div>
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('main')
);