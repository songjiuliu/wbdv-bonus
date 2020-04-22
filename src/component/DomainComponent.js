import React from "react";

var date = new Date()
export default class DomainComponent extends React.Component {

    state = {
        domainlist: [],
        editingId: '',
        newcoursetitle: '',
        editingcoursetitle: ''
    }
    componentDidMount = async () => {
        fetch('https://wbdv-generic-server.herokuapp.com/shh/nuids/' + this.props.nuId + '/domains', {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            domainlist: profile
        })).then(status => console.log(this.state.domainlist))

    }
    addCourse = async () => {
        const newCourse = {
            title: this.state.newcoursetitle
        }
        //

        const actualCourse = await fetch("https://wbdv-generic-server.herokuapp.com/api/" + this.props.nuId + '/' + this.state.newcoursetitle, {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())

        const allCourses = await fetch('https://wbdv-generic-server.herokuapp.com/shh/nuids/' + this.props.nuId + '/domains', {
            method: 'GET'
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            domainlist: profile
        })).then(status => console.log(this.state.domainlist))
    }
    DeleteCourse= async (name) => {
        //"http://wbdv-generic-server.herokuapp.com/schemas/songjiu/hihihi5"
        const actualCourse = await fetch('https://wbdv-generic-server.herokuapp.com/schemas/' + this.props.nuId +name, {
            method: 'DELETE'
        }).then(reseponse => reseponse.json())

        const allCourses = await fetch('https://wbdv-generic-server.herokuapp.com/shh/nuids/' + this.props.nuId + '/domains', {
            method: 'GET'
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            domainlist: profile
        })).then(status => console.log(this.state.domainlist))
    }
    updateForm = (e) =>
        this.setState({
            newcoursetitle: e.target.value
        })
    updateDomain = (e) =>
        this.setState({
            editingcoursetitle: e.target.value
        })

    render() {
        return (
            <div class="container">

                <a href="/">back</a>

                <h5>Domain List</h5>
                <table className="table">
                    <thead>
                    < th
                        scope="col"> Name
                    </th>
                    </thead>

                    <tbody>
                    {
                        this.state.domainlist.map(name =>
                            <tr>
                                {this.state.editingId == name && <th>
                                    domains
                                    <input
                                        value={name}
                                        onChange={this.updateDomain}
                                    />
                                    <button
                                        type="button" class="btn btn-warning"
                                        onClick={() => this.setState({
                                        editingId: ''
                                    })}>
                                        cancel
                                    </button>

                                    <button type="button" class="btn btn-success">save</button>
                                    <button
                                        type="button" class="btn btn-danger"
                                        onClick={() => {this.DeleteCourse(name)
                                            }}
                                    >delete</button>
                                </th>}
                                <th scope="row">
                                    <a href={"/wam/nuids/" + this.props.nuId + "/domains/" + name}>{name}
                                    </a>
                                    <button
                                        type="button" class="btn btn-warning"
                                        onClick={() => this.setState({
                                        editingId: name
                                    })}>
                                        edit
                                    </button>
                                </th>
                            </tr>
                        )
                    }
                    <tr>
                        <input onChange={this.updateForm}
                               value={this.state.newcoursetitle}/>
                        <button onClick={this.addCourse}>
                            Add Domain
                        </button>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}