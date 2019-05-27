import React from 'react';
import styles from './PollOptionControl.module.css';
import { Form } from 'react-bootstrap';

const pollOptionControl = (props) => (
    <div className={styles.PollOptionControl}>
        <Form.Group controlId="formOptionName">
            <Form.Label><strong>Option name</strong></Form.Label>
            <Form.Control type="text" name={"optName" + props.index} placeholder="Enter option name" required/>
        </Form.Group>
        <Form.Group controlId="formOptionDesc">
            <Form.Label><strong>Option Description</strong></Form.Label>
            <Form.Control as="textarea" name={"optDesc" + props.index} rows="3" placeholder="Enter option description" />
        </Form.Group>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                    </span>
            </div>
            <div className="custom-file">
                <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    accept="image/png, image/jpeg"
                    name={"optImg" + props.index}
                />
                <label id="uploadLabel" className="custom-file-label" htmlFor="inputGroupFile01">
                    Upload image
                </label>
            </div>
        </div>
    </div>
);

export default pollOptionControl;