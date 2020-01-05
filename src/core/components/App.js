// @flow
import React, { type Node, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from 'react-bootstrap/Container';

import type { Dispatch } from '../models';
import Header from '../../header/components/Header';
import Footer from '../../footer/components/Footer';
import * as projectActions from '../../project/actions';

type Props = {
  children: Node,
  getProjectsList: () => void,
};

class App extends Component<Props> {
  componentDidMount() {
    const { getProjectsList } = this.props;
    getProjectsList();
  }

  render() {
    const { children } = this.props;
    return (
      <div className="app-container">
        <Header />
        <Container>
          { children }
        </Container>
        <Footer />
      </div>
    );
  }
}

const mapState = () => ({});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  getProjectsList: projectActions.getProjectsList,
}, dispatch);

export default connect(mapState, mapDispatch)(App);
