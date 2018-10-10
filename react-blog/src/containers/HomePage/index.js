import React from 'react';
import ArticleBanner from '../../components/ArticleBanner';
import request from '../../utils/request';

class HomePage extends React.Component {
  state = { articles: [] };

  async componentDidMount() {
    const articles = await request('http://localhost:1337/articles', { method: 'GET' });

    this.setState({ articles });
  }

  render() {
    return (
      <div style={{ padding: '50px 15px' }}>
        <h1>
          All articles
        </h1>
        <div>
          {this.state.articles.map(article => <ArticleBanner  key={article.id} {...article} />)}
        </div>
      </div>
    );
  }
}

export default HomePage;