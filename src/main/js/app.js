import React from 'react';
import ReactDOM from 'react-dom';
import VexFlow from 'vexflow';
import MusicScaleList from './components/musicScaleList';

export class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>All the Scales!</h1>
                <MusicScaleList />
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('main')
);