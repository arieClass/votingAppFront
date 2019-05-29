import React, { Component, Fragment } from 'react';
import classes from './Modal.module.css'
import Backdrop from '../Navigation/Backdrop/Backdrop';


class Modal extends Component {

<<<<<<< HEAD


=======
>>>>>>> a164eed4b4882c721bc60ae4bf763e0d1cf5e3dc
    componentDidMount(){
        console.log('[Modal] willUpdate');
    }
    componentWillUpdate(){
        console.log('[Modal] willUpdate');
    }

    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;