import React, {Component} from 'react';
import {Words_list} from "../api/words_list";
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { DropdownButton} from 'react-bootstrap';
import { MenuItem} from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';



const st = {maxWidth: 400, margin: '0 auto 10px'};
export default class List_w extends Component {

    deleteThisWord(){
        const id = this.props.list._id;
        Meteor.call('word.remove',id);

    }
    handleRepeats(number){
        console.log(number);
        Words_list.update({_id: this.props.list._id}, { $set: {repeats: number}});
        console.log( Words_list.find().fetch());


    }

    render(){
        return(

            <form style={st}>
                <ButtonToolbar>
                    <DropdownButton
                        title={this.props.list.word}
                        bsSize="large"
                        noCaret
                    >
                        <MenuItem eventKey="1" onClick={()=>{this.handleRepeats(1) }}>1</MenuItem>
                        <MenuItem eventKey="2" onClick={()=>{this.handleRepeats(2) }}>2</MenuItem>
                        <MenuItem eventKey="3" onClick={()=>{this.handleRepeats(3) }}>3</MenuItem>
                        <MenuItem eventKey="4" onClick={()=>{this.handleRepeats(4) }}>4</MenuItem>
                        <MenuItem eventKey="5" onClick={()=>{this.handleRepeats(5) }}>5</MenuItem>
                    </DropdownButton>

                    <Button

                        bsSize="large" >
                        {this.props.list.trans}
                    </Button>
                    <Button  bsStyle="danger"
                             bsSize="large"
                             className="delete"
                             onClick={()=>{
                                 this.deleteThisWord(this);
                                 this.props.updateWordlist(this.props.list._id-1);
                             }}>
                        &times;
                    </Button>
                </ButtonToolbar>

            </form>)

    }

}