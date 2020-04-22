import React from "react";


export default class ItemComponent extends React.Component {

    state = {
        itemlist: [],
        editingId: '',
        profile: {},
        newtitle: '',
        newcontent: ''
    }
    //http://wbdv-generic-server.herokuapp.com/api/songjiu/lsjq123
    CreateCourse = async () => {

        const actualCourse = await fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId, {
            method: 'POST'
        }).then(reseponse => reseponse.json())

        const allCourses = await fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId, {
            method: 'GET'
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            itemlist: profile
        })).then(status => console.log(this.state.domainlist))
    }
    //http://wbdv-generic-server.herokuapp.com/api/songjiu/lsjq123/5e9e51226853520017fda80b
    DeleteCourse = async (name) => {

        const actualCourse = await fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId + '/' + name, {
            method: 'DELETE'
        }).then(reseponse => reseponse.json())

        const allCourses = await fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId, {
            method: 'GET'
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            itemlist: profile
        })).then(status => console.log(this.state.domainlist))
    }
    UpdateCourse = async (name) => {
        //"http://wbdv-generic-server.herokuapp.com/schemas/songjiu/hihihi5"
        //alert('http://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId + '/' + name)
        const actualCourse = await fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId + '/' + name, {
            method: 'PUT',
            body: JSON.stringify(this.state.profile),
            headers: {
                'content-type': 'application/json'
            }
        }).then(reseponse => reseponse.json())
        if (this.state.newtitle != '') {
            const newobj = {[this.state.newtitle]: this.state.newcontent}
            const actualCourse = await fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId + '/' + name, {
                method: 'PUT',
                body: JSON.stringify(newobj),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(reseponse => reseponse.json())
        }
        const allCourses = await fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId, {
            method: 'GET'
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            itemlist: profile
        })).then(status => console.log(this.state.domainlist))
    }
    componentDidMount = async () => {
        fetch('https://wbdv-generic-server.herokuapp.com/api/' + this.props.nuId + '/' + this.props.itemId, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            itemlist: profile
        })).then(status => console.log(this.state.itemlist))
        console.log(this.state.itemlist)

    }

    render() {
        return (
            <div class="container">
                <a href={"/wam/nuids/" + this.props.nuId}>
                    back
                </a>
                <h5>{this.props.itemId} Items List</h5>
                <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                    {
                        this.state.itemlist.map(name => {
                                let temparray = []
                                for (var i in name) {
                                    if (i.toString().search('_') == -1)
                                        temparray.push(name[i])
                                }
                                //console.log(temparray)
                                //console.log(name)
                                return <div>
                                    <tr>
                                        {
                                            temparray.map(realname => {
                                                    return <td>
                                                        {realname.toString()}
                                                    </td>
                                                }
                                            )
                                        }

                                        <button type="button" class="btn btn-warning" onClick={() => this.setState({
                                            profile: name,
                                            editingId: name._id
                                        })}>Edit
                                        </button>

                                    </tr>
                                    {this.state.editingId == name._id && this.state.profile && <div>
                                        <button
                                            type="button" class="btn btn-success"
                                            onClick={() => {
                                                this.UpdateCourse(name._id).then(res =>
                                                    this.setState({editingId: ''}))
                                                //alert('22')
                                            }
                                            }
                                        >save
                                        </button>
                                        <button
                                            type="button" class="btn btn-danger"
                                            onClick={() => {
                                                this.DeleteCourse(name._id).then(res =>
                                                    this.setState({editingId: ''}))
                                            }}
                                        >delete
                                        </button>
                                        {
                                            this.state.itemlist.map(name => {
                                                let temparray2 = Object.keys(name)
                                                return <div>
                                                    {
                                                        temparray2.map(key => {
                                                            return key.toString().search('_') == -1 && this.state.profile[key] &&
                                                                <p>
                                                                    {key.toString()}
                                                                    <input
                                                                        type="text" class="form-control"
                                                                        onChange={(e) => {
                                                                        const changevalue = key.toString()
                                                                        this.setState({
                                                                            profile: {
                                                                                ...this.state.profile,
                                                                                [changevalue]: e.target.value
                                                                            }
                                                                        })
                                                                        console.log(this.state)
                                                                        console.log(e.target.value)

                                                                    }
                                                                    }
                                                                           value={this.state.profile[key]}/>
                                                                </p>
                                                        })
                                                    }

                                                </div>

                                            })
                                        }
                                        <div className="row">
                                            <input

                                                type="text" class="form-control col-sm-6"
                                                placeholder="field" value={this.state.newtitle} onChange={(e) => {
                                                //const changevalue = key.toString()
                                                this.setState({
                                                    newtitle: e.target.value
                                                })
                                                //console.log(this.state)
                                                //console.log(e.target.value)
                                            }
                                            }/>
                                            <input
                                                type="text" class="form-control col-sm-6"
                                                value={this.state.newcontent} onChange={(e) => {
                                                //const changevalue = key.toString()
                                                this.setState({
                                                    newcontent: e.target.value
                                                })
                                                //console.log(this.state)
                                                //console.log(e.target.value)
                                            }
                                            }/>
                                        </div>
                                    </div>
                                    }
                                </div>

                            }
                        )
                    }
                    </tbody>
                </table>
                <div class="row">
                    <button
                        type="button"
                        class="col-sm-3 btn btn-primary btn-block"
                        onClick={() => {
                            this.CreateCourse()
                        }}
                    >
                        add{this.props.itemId}
                    </button>
                    <div class="col-sm-9"></div>
                </div>
            </div>
        )
    }
}