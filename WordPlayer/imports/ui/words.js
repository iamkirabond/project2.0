import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

import {Words_list} from '../api/words_list.js';

import List_w from './list_w.js';
import Parent from "./parent";
import PlayLists from "./playLists";

const propListName = String;



export default class Words extends Component{

    constructor(props){
        super(props);
        this.state={
            current: null,
            count: 0,
            wordId: null,
        }
    }

    playWords(event){
        event.preventDefault();
        let list = Words_list.find({listname: this.props.currentList}).fetch();
        window.speechSynthesis.cancel();
        let eng_text = [];
        let ru_text = [];
        let n_repeats = 1;

        for(let i = 0; i < list.length;i++){
            eng_text.push(list[i].word);
            ru_text.push(list[i].trans);
        }

        const eng_voice = [];
        const ru_voice = [];

        if(!n_repeats)
            n_repeats = 1;

        for(let i = 0; i < eng_text.length; i++){
            eng_voice[eng_voice.length] = new SpeechSynthesisUtterance(eng_text[i]);
            ru_voice[ru_voice.length] = new SpeechSynthesisUtterance(ru_text[i]);
        }

        for(let j = 0; j < n_repeats; j++)
            for (let i = 0; i < eng_text.length; i++) {
                eng_voice[i].lang = 'en-US';
                window.speechSynthesis.speak(eng_voice[i]);
                window.speechSynthesis.speak(ru_voice[i]);
            }
    }
    setFind = (List)=> {
        return (Words_list.find({listname: List}).fetch());
    };
    setList = (text,listName)=>{
        Meteor.call('word.translate',text,listName);
    };

    addWord(event){
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('word.translate',text,this.state.current);

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        this.updateWait(this.state.count);
    }

    updateWait(count){
        setTimeout(() => {
           if(count == Words_list.find({listname: this.state.current}).count()){
               this.updateWait(count);
           }
           else {
               this.updateWordlist(count+1);
           }
        }, 10);
    }

    updateWordlist = (value) => {
        this.setState({ count: value});
        console.log(this.state.count);

    };



    printWord_list(){

        if(!this.state.current){
            this.setState({
                current: this.props.currentList,
                count: Words_list.find({listname: this.props.currentList}).count(),
            });
        }
        if (!this.state.count){

            this.setState({count: Words_list.find({listname: this.props.currentList}).count()}
            );
        }
        console.log('current', this.state.current);
        return(
            <div>
                {Words_list.find({listname: this.props.currentList}).fetch().map((list)=>(
                    <span>
                    <List_w
                        key={list._id}
                        list={list}
                        updateWordlist={this.updateWordlist}
                    />
                    </span>
                ))}
            </div>
        );
    }

    render(){
            if(this.props.renderWords){
                return (<div>

                    <form onSubmit={this.addWord.bind(this)}>
                        <input type="text"
                               ref="textInput" />
                        <Button
                            bsStyle="primary"
                            onClick={
                                this.addWord.bind(this)
                            }>
                            Add</Button>
                    </form>
                    <ul>
                        {this.printWord_list()}
                    </ul>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={this.playWords.bind(this)}
                    >Play</Button>

                    <Button  bsStyle="primary" onClick={()=>{this.props.updateWords(false)}}>Back</Button>
                </div>);

            }
            else{
                return (<div>

                </div>)
            }
    }
}