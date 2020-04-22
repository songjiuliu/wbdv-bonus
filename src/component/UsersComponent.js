import React from "react";


export default class UsersComponent extends React.Component {

    state = {
        namelist: []
    }
    componentDidMount = async () => {
        fetch(`https://wbdv-generic-server.herokuapp.com/shh/nuids`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            namelist: profile
        })).then(status => console.log(this.state.namelist))

    }

    render() {
        return (
            <div>
                <h5>Users List</h5>
                <table className="table">
                    <thead>
                    < th
                        scope="col"> Name
                    </th>
                    </thead>

                    <tbody>
                    {
                        this.state.namelist.map(name =>
                            <tr>
                                <th scope="row">
                                    <a href={"/wam/nuids/"+name}>{name}
                                    </a>
                                </th>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}