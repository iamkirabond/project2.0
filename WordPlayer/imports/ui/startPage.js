import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {PageHeader} from 'react-bootstrap';

const st = {maxWidth: 400, margin: '0 auto 10px'};

export default class StartPage extends Component{

    goFastplay(){
        return FlowRouter.go('/fastplay');
    }

    goNewplaylist(){
        return FlowRouter.go('/create_new');
    }

    goPlaylist(){
        return FlowRouter.go('/playlists');
    }
    goWords(){
        return FlowRouter.go('/words');
    }

    render(){
        return(
            <div>
                <div className="container" align = "center" >
                    <header>
                        <PageHeader>Word Player</PageHeader>
                    </header>
                    <Button bsStyle="primary" bsSize="large"  onClick={this.goPlaylist}><strong><i>Playlists</i></strong></Button>

            </div>
            </div>
        );
    }
}
/*<button onClick={this.goWords}>words</button>*/