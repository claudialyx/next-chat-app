import React, { Component } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react'
import { FormText } from 'reactstrap';

const SendMessageForm = ({ textInput, sendMessage, messageTyped, enterKeySubmit }) => {
    return (
        <div style={{ boxSizing: "borderBox" }}>
            <Form style={{ display: "flex" }}>
                <Form.Field style={{ width: "72vw", display: "flex" }}>
                    <TextArea maxLength="500" type="text" onKeyPress={enterKeySubmit} onChange={messageTyped} value={textInput} placeholder=" Type a message" />
                    <Button style={{ margin: "2vw", color: "black" }} onClick={sendMessage} icon='share' />
                    {textInput.length === 500 && <FormText>Message cannot be longer than 500 characters</FormText>}
                </Form.Field>
            </Form>
        </div>
    )
}

export default SendMessageForm
