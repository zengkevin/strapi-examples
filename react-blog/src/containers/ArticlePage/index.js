import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ArticlePage.css';
import request from '../../utils/request';

class ArticlePage extends React.Component {
  state = { data: {} };

  async componentDidMount() {
    const { match: { params: { articleId } } } = this.props;
    const data = await request(`http://localhost:1337/articles/${articleId}`, { method: 'GET' });

    this.setState({ data });
  }

  renderLink = (props) => {
    return <a href={props.href} target="_blank" rel="noopener noreferrer" >{props.children}</a>
  }
  render() {
    const { data } = this.state;

    return (
      <div className="article-page">
        <ReactMarkdown
          renderers={{
            link: this.renderLink,
          }}
          source={data.content}
        />
      </div>
    );
  }
}

export default ArticlePage;