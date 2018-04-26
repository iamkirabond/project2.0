import React, {Component} from 'react';
import {Words_list} from "../api/words_list";
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


export default class List_w extends Component {

    deleteThisWord(){
        const id = this.props.list._id;
        Meteor.call('word.remove',id);
    }



    render(){
        return(

            <form>
                <ButtonToolbar>
                    <Button  bsStyle="primary"
                             bsSize="large"
                             className="delete"
                             onClick={()=>{
                                 this.deleteThisWord(this);
                                 this.props.updateWordlist(this.props.list._id-1);
                             }}>
                        &times;
                    </Button>
                    <Button
                        bsStyle="primary"
                        bsSize="large">

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