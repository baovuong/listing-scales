const React = require('react');
const ReactDOM = require('react-dom');

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

ReactDOM.render(
    <App />,
    document.getElementById('react')
);