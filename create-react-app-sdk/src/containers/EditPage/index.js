/**
 *  
 * EditPage
 */

 import React from 'react';
import { Link } from 'react-router-dom';
import { findIndex, get, isArray, isEmpty, map } from 'lodash';
// Components
import Button from '../../components/Button';
import Input from '../../components/InputsIndex';

import strapi from '../../utils/Strapi';

import layout from './layout.json';
import './styles.scss';

class EditPage extends React.Component {
  state = {
    didCheckErrors: false,
    errorFetch: false,
    errors: [],
    inititalData: {},
    inputs: [],
    fileRelations: [],
    modifiedData: {},
  };

  async componentDidMount() {
    const { match: { params: { contentType, id } } } = this.props
    this.setInputs();

    if (id !== 'create') {
      try {
        const data = await strapi.getEntry(contentType, id);
        delete data.updatedAt;
        delete data.updated_at;
        this.setState({ inititalData: data, modifiedData: data });
      } catch(err) {
        this.setState({ errorFetch: true });
      }
    }
  }

  // Reset form to its inital value
  cancel = () => this.setState({ modifiedData: this.state.inititalData });

  handleChange = (e) => {
    const name = e.target.name;

    this.setState({
      modifiedData: { ...this.state.modifiedData, [name]: e.target.value },
    });
  }

  handleSubmit = async (e) => { 
    e.preventDefault();
    const { match: { params: { contentType, id } } } = this.props;
    const body = this.createBody();

    if (id !== 'create') {
      try {
        await strapi.updateEntry(contentType, id, body);
        this.uploadFiles();
        this.props.history.push(`/${contentType}`);
      } catch(err) {
        // Silent
      }
    } else {
      try {
        const { id } = await strapi.createEntry(contentType, body);
        this.uploadFiles(id);
        this.props.history.push(`/${contentType}`);
      } catch(err) {
        // Silent
      }
    }
  }

  createBody = () => {
    const { modifiedData, fileRelations } = this.state;
    const body = Object.keys(modifiedData).reduce((acc, curr) => {
      const index = findIndex(fileRelations, ['name', curr]);

      if (index === -1) {
        acc[curr] = modifiedData[curr];
      } else {
        const canFilter = fileRelations[index].multiple === true;
        let alreadyUploadedFiles;

        if (canFilter) {
          alreadyUploadedFiles = modifiedData[curr].filter(file => {
            if (file instanceof File === false) {
              return file;
            }
          });
          
        } else {
          if (get(modifiedData, [curr, 0]) instanceof File === false) {
            alreadyUploadedFiles = modifiedData[curr];
          }
        }
        acc[curr] = alreadyUploadedFiles;
      }

      return acc;
    }, {});

    return body;
  }

  uploadFiles = async (refId = this.props.match.params.id) => {
    const { fileRelations, modifiedData } = this.state;
    const { match: { params: { contentType } } } = this.props;
    
    fileRelations.map(relation => {
      const  body = new FormData();
      let shouldAppend = true;

      body.append('refId', refId);
      body.append('ref', contentType);
      body.append('field', relation.name);

      if (contentType === 'user') {
        body.apprend('source', 'users-permissions');
      }

      if (isArray(modifiedData[relation.name])) {
        map(modifiedData[relation.name], file => {
          if (file instanceof File) {
            body.append('files', file);
          }
        });
      } else {
        if (get(modifiedData, [relation.name, 0]) instanceof File) {
          body.append('files', modifiedData[relation.name][0]);
        }
      }
      try {
        this.upload(body);
      } catch(err) {
        // Silent
      }
    });
  }

  upload = async (body) => {
    await strapi.upload(body);
  }

  setInputs = () => {
    const { match: { params: { contentType } } } = this.props;
    const attributes = layout[contentType].attributes;

    const inputs = Object.keys(attributes).reduce((acc, curr) => {
      const type = get(attributes, [curr, 'type']);
      const isFile  = get(attributes, [curr, 'plugin']) === 'upload';

      if (type) {
        return acc.concat([ Object.assign({ name: curr }, attributes[curr] )]);
      }

      if (isFile) {
        const obj = {
          name: curr,
          type: 'file',
          multiple: attributes[curr].hasOwnProperty('collection'),
          required: attributes[curr].required || false,
        };

        this.setState(prevState => ({ fileRelations: prevState.fileRelations.concat([obj])}));

        return acc.concat([ obj ]);
      }

      return acc;
    }, []);

    this.setState({ inputs });
  }

  render() {
    const { didCheckError, errorFetch, errors, inputs, modifiedData } = this.state;
    const { match: { params } } = this.props;
    const title = params.id === 'create' ? `Create a new ${params.contentType}` : `Edit ${params.id}`;

    if (errorFetch) {
      return <div>An error occured</div>;
    }

    return (
      <div className="editPageWrapper">
        <div className="container-fluid">
          <h1>{title}</h1>
          <Link to={`/${params.contentType}`}>Back</Link>
          <form className="formWrapper" onSubmit={this.handleSubmit}>
            <div className="row">
              {inputs.map(input => {
                let defaultValue = get(modifiedData, input.name, input.type === 'file' ? [] : '');

                if (input.type === 'file' && get(modifiedData, input.name) === null && input.multiple === false) {
                  defaultValue = {};
                }

                return (
                  <Input
                    didCheckError={didCheckError}
                    errors={get(
                    errors,
                    [
                      findIndex(errors, ['name', input.name]),
                      'errors',
                    ],
                    []
                  )}
                    label={input.name}
                    key={input.name}
                    multiple={input.multiple}
                    name={input.name}
                    onChange={this.handleChange}
                    type={input.type}
                    value={defaultValue}
                  />
              )})}
            </div>
            <div className="row">
              <div className="col-md-12">
                <Button type="button" onClick={this.cancel}>Cancel</Button>
                <Button type="submit" primary>Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditPage.defaultProps = {};
EditPage.propTypes = {};

export default EditPage;