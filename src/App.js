import React from 'react';
import logo from './logo.svg';
import './App.css';
import Movies from './Movies'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: '',
      sort: '',
      error: null,
      apiKey: ''
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setApi(apiKey) {
    this.setState({
      apiKey
    });
  }

  // setSort(sort) {
  //   this.setState({
  //     sort
  //   });
  // }

  handleSubmit(e) {
    e.preventDefault();

    //construct a URL with the query string
    const baseUrl = 'http://localhost:8000/movie';
    const params = [];
    if (this.state.search) {
      params.push(`country=${this.state.search}`);
    }

    // if (this.state.sort) {
    //   params.push(`sort=${this.state.sort}`);
    // }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer: ${this.state.apiKey}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          movies: data,
          error: null //reset errors
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: 'Sorry, could not get movies at this time.'
        });
      })

  }

  render() {
    //map over all the books
    const movies = this.state.movies.map((movie, i) => {
      return <Movies {...movie} key={i} />
    })
    return (
      <main className="App">
        <h1>Movies List</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search: </label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)} />
            {/* <label htmlFor="sort">Sort: </label> */}
            {/* <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="rank">Rank</option>
            </select> */}
            <input
              type='text'
              id='apiKey'
              name='apiKey'
              value={this.state.apiKey}
              onChange={e => this.setApi(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{this.state.error}</div>
        </div>
        {movies}
      </main>
    );
  }




}

export default App;