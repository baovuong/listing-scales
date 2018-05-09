const React = require('react');
const ReactDOM = require('react-dom');
const VexFlow = require('vexflow');

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>wowowowow!</h1>
        )
    }
}

class MusicalScale extends React.Component {
    constructor(props) {
        super(props);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);