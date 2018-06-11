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
            <div className="container">
                <div id="musicScaleList">
                    <MusicScaleList viewScale={this.onViewScale} isMobile={this.isMobile()} />
                </div>
                <div id="musicScaleView">
                    {selectedScale != null &&
                    <MusicScaleView scale={selectedScale} />}
                </div>
            </div>
        )
    }

    isMobile() { 
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
           return true;
         }
        else {
           return false;
         }
       }
}



ReactDOM.render(
    <App />,
    document.getElementById('main')
);