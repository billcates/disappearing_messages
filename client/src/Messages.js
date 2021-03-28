import React from 'react';

class Messages extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            fetchError : ''
        };
    }
    componentDidMount()
    {
        const headers = {
            method: 'GET'
        };
        let hostname = "https://disappearing-messages1.herokuapp.com/";

        fetch( `${hostname}messages/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    message : json.message
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
                <br />
                Your Message is : <br /> <br /> <b>
                {this.state.message}</b>
            </div>
        )
    }
}

export default Messages;