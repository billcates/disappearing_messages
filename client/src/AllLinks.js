import React from 'react';

class AllLinks extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            links: [],
            fetchError : ''
        };
    }
    componentDidMount()
    {
        const headers = {
            method: 'GET'
        };
        let hostname = "https://disappearing-messages1.herokuapp.com/";

        fetch( `${hostname}messages/`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    messages : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError :"Details cannot be fetched!!!Something went wrong!"
                });
            })

        fetch( `${hostname}links/`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    links : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError :"Details cannot be fetched!!!Something went wrong!"
                });
            })
        }

    render()
    {
        if(this.state.fetchError !== '')
        {
            return(
                <div>{this.state.fetchError}</div>
            )
        }
        return(
            <div>
                <h3>Messages</h3>
                {this.state.messages.map((message,i) => {
                    return(
                        <div key={i}>
                            <div>Serial Number: {i+1}</div>
                            <div>Message Id: {message.messageID}</div>
                            <div>Message: {message.message}</div>
                            <div>Created Link: {message.disappearingLink}</div>
                            <div>Status: {new Date().toISOString() < message.expiringTime ? "Active" : "Expired"}</div>
                        </div>
                    )
                })}
                 <h3>Links</h3>
                {this.state.links.map((link,i) => {
                    return(
                        <div key={i}>
                            <div>Serial Number: {i+1}</div>
                            <div>Link Id: {link.linkID}</div>
                            <div>Actual Link: {link.link}</div>
                            <div>Created Link: {link.disappearingLink}</div>
                            <div>Status: {new Date().toISOString() < link.expiringTime ? "Active" : "Expired"}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default AllLinks;