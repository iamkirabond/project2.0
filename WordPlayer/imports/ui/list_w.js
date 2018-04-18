import React, {Component} from 'react';
import {Words_list} from "../api/words_list";
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';


export default class List_w extends Component {

    deleteThisList(){
        const id = this.props.list._id;
        Meteor.call('word.remove',id);
        console.log(id);
    }

    hendleEvent(){
        const id = this.props.list._id;
        console.log('hello',id, this.props.list.word);
    }

    render(){
        return(


            <form>
            <ButtonToolbar>
                <Button  bsStyle="primary"
                         bsSize="large"
                         className="delete"
                         onClick={()=>{
                             this.deleteThisList(this);
                             this.props.updateWordlist(this.props.list._id-1);
                         }}>
                    &times;
                </Button>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={
                        this.hendleEvent.bind(this)
                    }>
                    {this.props.list.word}
                </Button>
                <Button
                    bsStyle="primary"
                    bsSize="large" >
                    {this.props.list.trans}
                </Button>
            </ButtonToolbar>
        </form>)
    }

}