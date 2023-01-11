import React, { Component } from "react";

class Trump extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }
  handleClick = () => (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch(process.env.REACT_APP_API)
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        console.log(data);
        this.setState({
          loading: false,
          msg: data.topic + "(" + data.year + "): " + data.quote,
        });
      })
      .catch((error) => {
        this.setState({ loading: false, errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  render() {
    const { loading, msg } = this.state;
    const img_url = process.env.REACT_APP_IMAGE;
    console.log("image is " + img_url);
    return (
      <div className="App">
        <h2> Quotes from the Don</h2>
        <img
          className="display"
          alt="The divisive cheeto himself"
          width="960"
          height="330"
          src="https://cdn.pixabay.com/photo/2017/07/27/17/35/trump-2546104_960_720.jpg"
        />
        <p className="blocktext">
          <button className="btn" onClick={this.handleClick()}>
            {loading ? "Loading..." : "What did the Don Say"}
          </button>
          <br />
          <span>{msg}</span>
        </p>
      </div>
    );
  }
}
export default Trump;
