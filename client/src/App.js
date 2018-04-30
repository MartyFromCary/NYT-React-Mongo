import axios from "axios";
import API from "../utils/API";

import React, { Component } from "react";
import { Input /*, FormBtn*/ } from "./components/Form";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      startyear: "",
      endyear: "",
      newArticles: []
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSearch = event => {
    event.preventDefault();
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURLBase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${authKey}&q=`;

    console.log(this.state);

    let val = this.state.topic.trim();
    let queryURL = queryURLBase + val;

    val = this.state.startyear.trim();
    if (parseInt(val, 10)) {
      queryURL += `&begin_date=${val}0101`;
    }

    val = this.state.endyear.trim();
    if (parseInt(val, 10)) {
      queryURL += `&end_date=${val}1231`;
    }

    console.log(queryURL);
    axios
      .get(queryURL)
      .then(response => {
        const articles = response.data.response.docs.map(article => ({
          headline: article.headline.main,
          byline:
            article.byline && article.byline.original
              ? article.byline.original
              : "",
          published: article.pub_date,
          url: article.web_url
        }));
        console.log(articles);
        this.setState({ newArticles: articles });
      })
      .catch(err => console.log(err));

    /*
    API.searchCities({
      name: this.state.name.trim(),
      state: this.state.state.trim(),
      country: this.state.country.trim()
    })
      .then(res => this.setState({ cities: res.data }))
      .catch(err => console.log(err));*/
  };

  onSaveClick = article => {
    console.log(article);
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron" style={{ backgroundColor: "#2fa4e7" }}>
          <h1 className="text-center">
            <strong>New York Times Search</strong>
          </h1>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title text-center">Search</div>
              </div>
              <div className="panel-body text-center">
                <form>
                  <Input
                    value={this.state.topic}
                    onChange={this.handleInputChange}
                    name="topic"
                    placeholder="Topic (required)"
                  />
                  <Input
                    value={this.state.startyear}
                    onChange={this.handleInputChange}
                    name="startyear"
                    placeholder="Start Year (Optional)"
                  />
                  <Input
                    value={this.state.endyear}
                    onChange={this.handleInputChange}
                    name="endyear"
                    placeholder="End Year (Optional)"
                  />
                  <button
                    className="btn btn-info"
                    disabled={!this.state.topic}
                    onClick={this.handleFormSearch}
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title text-center">Results</div>
              </div>
              <div className="panel-body" />
              {this.state.newArticles.map(article => (
                <div className="well" key={article.url}>
                  <h3>
                    <strong>{article.headline}</strong>
                  </h3>
                  <h5>{article.byline}</h5>
                  <h5>{article.published}</h5>
                  <a href={article.url} target="_blank">
                    {article.url}
                  </a>
                  <br />

                  <button
                    className="btn btn-info"
                    style={{ marginTop: 10 }}
                    onClick={() => this.onSaveClick(article)}
                  >
                    SAVE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
