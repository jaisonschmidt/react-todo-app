/**
* TODO
* @method render
*/

import React, { Component } from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL_API = "http://localhost:3003/api/todos"

export default class Todo extends Component {

    constructor(props){
        super(props)

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.state = { description : "", list : [] }
        this.refresh();
    }

    refresh(description = ""){
        const desc = description ? `&description__regex=${description}` : ""
        Axios.get(`${URL_API}?sort=-createdAt${desc}`)
             .then(resp => this.setState({...this.state, description, list : resp.data}))
    }

    handleClear(){
        this.setState({...this.state, description : ""})
        this.refresh();
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleAdd(){
        console.log(this.state.description);
        Axios.post(URL_API, { description : this.state.description })
             .then(resp => this.refresh())
    }

    handleChange(e){
        this.setState({...this.state, description : e.target.value });
    }

    handleRemove(todo){
        Axios.delete(`${URL_API}/${todo._id}`)
             .then(resp => this.refresh());
    }

    handleMarkAsDone(todo){
        Axios.put(`${URL_API}/${todo._id}`, { ...todo, done : true })
             .then(resp => this.refresh())
    }

    handleMarkAsPending(todo){
        Axios.put(`${URL_API}/${todo._id}`, { ...todo, done : false })
             .then(resp => this.refresh())
    }

    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm 
                    handleChange={this.handleChange}
                    description={this.state.description}
                    handleAdd={this.handleAdd} 
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                />
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove} 
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    />
            </div>
        )
    }
}
