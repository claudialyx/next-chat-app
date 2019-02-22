import React, { Component } from 'react';
import { Input, Label, Menu } from 'semantic-ui-react'

export default class UsersSection extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const { myUser, onlineUsers } = this.props
        return (
            <>
                <Menu vertical style={{ width: '100%', height: "25vh", display: "flex", overflow: "hidden" }}>
                    <Menu.Item style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ fontWeight: 900, fontSize: "15px", display: "flex", margin: "5px" }}> Your Username:</div>
                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <img style={{ borderRadius: "13%", margin: "2px" }} src={`https://api.adorable.io/avatars/40/${myUser.username}.png`} />
                            <Label style={{ padding: "13px", fontSize: "13px" }} color='black'>{myUser.username}</Label>
                        </div>
                    </Menu.Item>
                </Menu>
                <div style={{ width: '100%', height: "100%", overflowY: "auto", overflowX: "hidden" }}>
                    < Menu vertical style={{ width: "100%" }} >
                        <p style={{ margin: "15px", color: "black", fontWeight: 900, fontSize: "15px", display: "flex", justifyContent: "center" }}>Online Users ({onlineUsers.length})</p>
                        {onlineUsers.map((onlineUsers, index) =>
                            <Menu.Item style={{ display: "flex", alignItems: "center" }} >
                                <img style={{ borderRadius: "13%", display: "inline", margin: "2px" }} src={`https://api.adorable.io/avatars/40/${onlineUsers.username}.png`} />
                                {onlineUsers.username}
                            </Menu.Item>)
                        }
                        < div style={{ float: "right", clear: "both" }} ref={(e) => { this.messagesEnd = e }}></div>
                    </Menu>
                </div>

            </>
        )
    }
}