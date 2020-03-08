import React, {Component} from 'react';
// import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Table,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Toast, ToastBody, ToastHeader
} from 'reactstrap';

import Widget from '../../components/Widget/Widget';

import { fetchPosts } from '../../actions/posts';
import s from './Calculator.module.scss';

const math = require('mathjs');


class Calculator extends Component {
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    posts: [],
    isFetching: false,
  };

  state = {
    isDropdownOpened: false,
    expr: '',
    result: '0',
    last_expr: 'Result'
  };

  componentDidMount() {
    if(process.env.NODE_ENV === "development") {
      this.props.dispatch(fetchPosts());      
    }
  }

  formatDate = (str) => {
    return str.replace(/,.*$/,"");
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  }

  updateExpr = (event) => {
    this.setState({expr: event.target.value});
  };

  evalExpr = (event) => {
    let node = null;
    let result = '';

    try {
      // parse the expression
      node = math.parse(this.state.expr);

      // evaluate the result of the expression
      result = math.format(node.compile().evaluate());
    }
    catch (err) {
      result = '<span style="color: red;">' + err.toString() + '</span>'
    }
    this.setState({result: result});
    this.setState({last_expr: this.state.expr});
  };

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Calculator</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Calculator</h1>
        <Row>
          <Col sm={12} md={6}>
            <Widget title="Results Stack">
              <Alert color="primary">
              <p className="lead text-right">Results</p>
              </Alert>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Widget title="Evaluate Expression">
              <Toast>
                <ToastHeader icon="primary">
                  {this.state.expr ? this.state.expr : "Result"}
                </ToastHeader>
                <ToastBody className="text-right">
                <p className="lead">{this.state.result}</p>
                </ToastBody>
              </Toast>
              <InputGroup>
                <Input 
                  type="text"
                  name="expr"
                  id="expr"
                  value={this.state.expr}
                  onChange={this.updateExpr}
                  placeholder="Enter expression to evaluate"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="checkfor for" />
                    <small>&nbsp; add to Results Stack</small>
                    </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <Button color="primary" onClick={this.evalExpr}>Evaluate</Button>
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
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Calculator);
