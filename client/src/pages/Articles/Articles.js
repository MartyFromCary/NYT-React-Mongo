import React, { Component } from "react";
import API from "../../utils/API";
import { Input } from "../../components/Form";

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      startyear: "",
      endyear: "",
      newArticles: [],
      savedArticles: [],
      urls: []
    };
  }

  handleInputChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  componentDidMount = () => this.loadSaved();

  loadSaved = () =>
    API.getArticle()
      .then(({ data: articles }) =>
        this.setState({
          savedArticles: articles,
          urls: articles.map(article => article.url)
        })
      )
      .catch(err => console.log(err));

  handleFormSearch = event => {
    event.preventDefault();

    const queryURLBase =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    let queryURL = queryURLBase;

    queryURL += `?api-key=${authKey}`;

    let val = this.state.topic.trim();
    queryURL += `&q=${val}`;

    val = this.state.startyear.trim();
    if (parseInt(val, 10)) {
      queryURL += `&begin_date=${val}0101`;
    }

    val = this.state.endyear.trim();
    if (parseInt(val, 10)) {
      queryURL += `&end_date=${val}1231`;
    }

    API.callURL(queryURL)
      .then(res =>
        this.setState({
          newArticles: res.data.response.docs
            .map(article => ({
              headline: article.headline.main,
              byline:
                article.byline && article.byline.original
                  ? article.byline.original
                  : "",
              published: article.pub_date,
              url: article.web_url
            }))
            .sort((a, b) => {
              a = new Date(a.published);
              b = new Date(b.published);

              return a > b ? -1 : a < b ? 1 : 0;
            })
        })
      )
      .catch(err => console.log(err));
  };

  onSaveClick = ({ headline, byline, published, url }) =>
    API.saveArticle({ headline, byline, published, url })
      .then(res => this.loadSaved())
      .catch(err => console.log(err));

  onDeleteClick = ({ _id }) =>
    API.deleteArticle({ _id })
      .then(res => this.loadSaved())
      .catch(err => console.log(err));

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
                  {this.state.urls.includes(article.url) ? (
                    <button className="btn btn-alert" style={{ marginTop: 10 }}>
                      SAVED
                    </button>
                  ) : (
                    <button
                      className="btn btn-info"
                      style={{ marginTop: 10 }}
                      onClick={() => this.onSaveClick(article)}
                    >
                      SAVE
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title text-center">Saved Articles</div>
              </div>
              <div className="panel-body" />
              {this.state.savedArticles.map(article => (
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
                    onClick={() => this.onDeleteClick(article)}
                  >
                    DELETE
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

export default Articles;
