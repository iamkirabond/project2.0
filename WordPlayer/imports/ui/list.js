import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';



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
        return(<div>
            <ButtonToolbar>
            <Button  bsStyle="primary"
                     bsSize="large"
                     className="delete"
                     onClick={() => {
                     this.deleteThisList(this);
                     this.props.updateData();}}
                     >
                &times;
            </Button>
            <Button
                bsStyle="primary"
                bsSize="large"
                onClick={()=>{
                    this.hendleEvent(this);
                    this.props.updatePlaylist(this.props.list._id);
                }}>
                {this.props.list.text}

            </Button>

            </ButtonToolbar>
        </div>)
    }

}