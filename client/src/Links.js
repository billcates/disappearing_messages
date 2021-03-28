import React  from "react";

class Links extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            fetchError : ''
        };
    }

    
    componentDidMount()
    {
        const headers = {
            method: 'GET'
        };
        let hostname = "https://disappearing-messages1.herokuapp.com/";

        fetch( `${hostname}links/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
              this.setState({
                  link : json.redirectTo
              })
            })
        
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError :"Details cannot be fetched!!!Something went wrong!"
                });
            })
        }
    render(){

            if(this.state.fetchError !== '')
            {
                return(
                    <div>{this.state.fetchError}</div>
                );
            }
            return(
            <div>
                <a href={this.state.link}>click here to go to site</a>
            </div>);
           
            
    }
}

export default Links;