import React from 'react';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : "",
            contentType : "Message",
            expiringTime: 5,
            generatedLink : "",
            copied: ""
        }
    }
    

    handleSubmit(event) {

      let hostname = "https://disappearing-messages1.herokuapp.com/";
      console.log(this.state);
      event.preventDefault();

      let data = {};
      if(this.state.contentType === "Message")
      {
        data.message = this.state.content
        hostname += "messages/"
      }
      else{
        data.link = this.state.content
        hostname += "links/"
      }
      data.expireIn = this.state.expiringTime;
      const headers = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch( hostname, headers)
    .then(response => response.json())
    .then(json => 
        {
            this.setState({
              content: '',
              generatedLink: json.Link,
              copied: ''
            })
            console.log(json);
        })
        .catch((err) => {
            console.log(err);
        })

    }

    onContentChange = (e) =>
    {
      this.setState({
        content : e.target.value
      })
    }

    onTypeChange = (e) =>
    {
      this.setState({
        contentType : e.target.value
      })
    }

    onTimeChange = (e) =>
    {
      this.setState({
        expiringTime : e.target.value
      })
    }
    copyLink = (event) =>
    {
      event.preventDefault();
      navigator.clipboard.writeText(this.state.generatedLink);
      this.setState({
        copied : "Copied!!!"
      })
    }

    render() {
      return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <h1>Disappearing Messages</h1>
          <label><center>Content: </center></label><center>
          <input id="fr"
            type="text"
            value={this.state.content}
            onChange={(e) => this.onContentChange(e)}
          /></center><br/>
          <label><center>Type: </center></label>
          <select  id="fr" onChange={(e) => this.onTypeChange(e)}>
          <option value="Message">Message</option>
          <option value="Link">Link</option>
        
          </select><br/><br/>
          <label>Expiring Time: </label>
          <select id="fr"  onChange={(e) => this.onTimeChange(e)}>
          <option value={1}>1 Minute</option>
          <option value={10}>10 Minute</option>
          <option value={60}>1 Hour</option>
          <option value={1440}>1 Day</option>
          </select><br/><br/><br/>
          <button id="fr" onClick={(e) => this.handleSubmit(e)}>Submit</button>
          <br/><br/><br/>
          <script>
          </script>
          <div>{this.state.generatedLink==="" ? null :
        <div>Your Generated Link: {this.state.generatedLink}<br/><br />
        <button id="fr"
                onClick={(e)=>this.copyLink(e)}> Copy</button> {this.state.copied}</div> 
        }</div>
        </form>
      );
    }
  }

  export default Form;