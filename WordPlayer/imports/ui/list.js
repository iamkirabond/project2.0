import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';


const st = { maxWidth: 400, margin: '0 auto 10px' };

export default class List extends Component {

    deleteThisList(){
        const id = this.props.list._id;
        Meteor.call('words.remove', id);
        Meteor.call('playlists.remove', id);
        return this.props.count;

    }

    hendleEvent(){
        const id = this.props.list._id;
        //Meteor.call('playlist.word',id);
        //FlowRouter.go('/words');

    }

    render(){
        return(<div style={st}>
            <ButtonToolbar>
                <Button  bsStyle="success"
                         bsSize="large"
                        onClick={()=>{
                        this.hendleEvent(this);
                        this.props.updatePlaylist(this.props.list._id);
                        }}
                >
                    <b> {this.props.list.text}</b>
                </Button>
                <Button  bsStyle="danger"
                         bsSize="large"
                         onClick={() => {
                         this.deleteThisList(this);
                         this.props.updateData();
                         }}
                >
                    <strong><i>Delete list</i></strong>
                </Button>

            </ButtonToolbar>

        </div>)
    }

}