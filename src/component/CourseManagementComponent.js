import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import UsersComponent from "./UsersComponent";
import ItemComponent from "./ItemComponent";
import DomainComponent from "./DomainComponent";
var date = new Date()

class CourseManagementComponent extends React.Component {

    state = {
        choosecourse: '',
        newcoursetitle: '',
        countid: 1,
        layout: 'table',
        editingCourse: false,

        courses: []
    }



    render() {
        return (
            <div>

                <Router>

                    <Route
                        path="/wam/nuids/:nuId"
                        exact={true}
                        render={(props) => {
                            console.log(props)
                            return <DomainComponent {...props}
                                                    nuId={props.match.params.nuId}/>
                        }
                        }/>

                    <Route
                        path="/"
                        exact={true}
                        render={(props) =>
                            <UsersComponent
                                {...props}
                            />
                        }/>
                    <Route
                        path="/wam/nuids/:nuId/domains/:itemId"
                        exact={true}
                        render={(props) =>
                            <ItemComponent
                                {...props}
                                nuId={props.match.params.nuId}
                                itemId={props.match.params.itemId}
                            />
                        }/>
                </Router>

            </div>)
    }
}

export default CourseManagementComponent