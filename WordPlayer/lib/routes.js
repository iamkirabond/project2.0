import React from 'react';
import ReactDOM from 'react-dom';


import StartPage from '/imports/ui/startPage.js';

import Words from '../imports/ui/words.js';
import Parent from "../imports/ui/parent";

FlowRouter.wait();

FlowRouter.route('/',{
    action: function(){
        ReactDOM.render(

            <StartPage />,
            document.getElementById('render-target'));
    }
});

FlowRouter.route( '/playlists', {
    action: function() {
        ReactDOM.render(
                <Parent/>,
            document.getElementById('render-target'));
    }
});

FlowRouter.route( '/playlist/words', {
    action: function() {
        ReactDOM.render(

                <Words/>,

            document.getElementById('render-target'));
    }
});

FlowRouter.route('/words',{
    action: function(){
        ReactDOM.render(
                <Parent/>,
            document.getElementById('render-target'));
    }
});



