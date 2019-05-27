import React, { Component } from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import { Button} from "react-bootstrap";
import Parse from 'parse'

class NavigationItems extends Component {
    constructor(props){
        super(props)
        this.state={

        }
        this.active =  this.props.props.history.location.pathname
    }


    componentDidUpdate() {
        this.active =  this.props.props.history.location.pathname

    }



    handleLogout = async event => {
        await Parse.User.logOut();
        this.props.props.history.push("/login");

    };

    render() {
        return (

                Parse.User.current() ?
                    <ul className={styles.NavigationItems}>

                        <NavigationItem active={this.active} props={this.props.props} link="/createPoll">Create Poll</NavigationItem>
                        < NavigationItem active={this.active} props={this.props.props} link="/viewPoll">View Poll</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/statistics">Statistics</NavigationItem>
                        <Button onClick={this.handleLogout} variant="outline-info">Logout</Button>

                    </ul>
                    :
                    <ul className={styles.NavigationItems}>
                        <NavigationItem active={this.active} props={this.props.props} link="/createPoll">Create Poll</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/statistics">Statistics</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/signup">Signup</NavigationItem>
                        <NavigationItem active={this.active} props={this.props.props} link="/login">Login</NavigationItem>


                    </ul>



        );
    }

};

export default NavigationItems;