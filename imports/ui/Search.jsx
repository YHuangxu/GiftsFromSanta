/*import React, { Component } from "react";
import "./style/App.css";
import Jumbo from "./Jumbotron.js";
import Post from "./Post.js";
import MainTemplate from "./MainTemplate.js";
import { Icon, Input } from "semantic-ui-react";
import CardColumns from "react-bootstrap/CardColumns";

class App extends Component {
  constructor(props) {
    super(props);

    this.myInputText = null;

    this.state = {
      posts: [],
      search: ""
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    fetch("/api/getPosts")
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data
        });
      });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substring(0, 20) });
    console.log(event.target.value);
  }

  render() {
    let filterPost = this.state.posts.filter(post => {
      return (
        post.breed.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <MainTemplate>
        <Jumbo />

        <div className="App container">
          <div>
            <Input
              size="huge"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              icon={<Icon name="search" inverted circular link />}
              placeholder="Search..."
            />
            <br />
            <br />
          </div>

          <div className="row">
            <CardColumns>
              {filterPost.map((p, i) => (
                <Post key={i++} post={p} />
              ))}
            </CardColumns>
          </div>
        </div>
      </MainTemplate>
    );
  }
}

export default App;*/