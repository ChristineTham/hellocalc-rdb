import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import MonacoEditor from 'react-monaco-editor';
import * as math from 'mathjs';

// import MathJax from 'react-mathjax-preview'

import Widget from '../../components/Widget/Widget';

import s from './Editor.module.scss';

// const math = require('mathjs');

class Editor extends Component {
  /* eslint-disable */
  static propTypes = {
    isFetching: PropTypes.bool,
  };
  /* eslint-enable */

  static defaultProps = {
    isFetching: false,
  };

  state = {
    editBuffer: '1.2 * (2 + 4.5)\n12.7 cm to inch\nsin(45 deg) ^ 2\n9 / 3 + 2i\ndet([-1, 2; 3, 1])',
    outputArray: [''],
    isDropdownOpened: false,
  };

  evalBuffer = (event) => {
    const parser = math.parser();
    // const model = this.refs.monaco.editor.getModel();
    const buffer = this.refs.monaco.editor.getValue();
    this.setState({editBuffer: buffer});

    const inputs = buffer.split('\n');
    const outputs = inputs.map(expr => parser.evaluate(expr).toString());
    this.setState({outputArray: outputs});
  };

  render() {
    const options = {
      tabCompletion: "off",
      acceptSuggestionOnEnter: "off"
    };
    const results = this.state.outputArray.map(item => <li>{item}</li>);
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Editor</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Editor</h1>
        <Row>
          <Col sm={12} md={6}>
            <Widget title="Editor">
              <p>Enter an expression per line, then press Evaluate to see the results.</p>
              <div className="p-2"><Button color="primary" onClick={this.evalBuffer}>Evaluate</Button></div>
              <div className="border border-primary">
              <MonacoEditor
                ref="monaco"
                height="500"
                language="javascript"
                value={this.state.editBuffer}
                options={options}
              />
              </div>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Widget title="Results">
              <ol>
                {results}
              </ol>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
  };
}

export default connect(mapStateToProps)(Editor);
