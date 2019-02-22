import React, { Component } from 'react';
import { Container, Message, Label } from 'semantic-ui-react';
import { FormText } from 'reactstrap';



export default class DisplayChat extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const { incomingData, myUser } = this.props
        return (
            <>
                <Container style={{ overflowY: "auto", maxHeight: "95%" }}>
                    {incomingData.map((incomingData, index) =>
                        <div style={{ clear: "both", marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: incomingData.username !== myUser.username ? "flex-start" : "flex-end" }}>
                            <Label color={incomingData.username !== myUser.username ? null : 'black'} as='a' image><img src={`https://api.adorable.io/avatars/150/${incomingData.username}.png`} />{incomingData.username}</Label>
                            <br />
                            <Message compact style={{ overflowX: "hidden", margin: "5px" }}> <pre style={{
                                whiteSpace: "pre-wrap", overflowWrap: "break-word", wordWrap: "break-word", msWordBreak: "break-all", wordBreak: "break-all", wordBreak:
                                    "break-word"
                            }} >{incomingData.message}</pre></Message>
                            <FormText style={{ margin: "1px" }}>{incomingData.timestamp}</FormText>
                        </div>
                    )}
                    <div style={{ float: "right", clear: "both" }} ref={(e) => { this.messagesEnd = e }}></div>
                </Container>
            </>
        )
    }
}
