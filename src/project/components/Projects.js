// @flow
import React, { PureComponent } from 'react'
import * as projectsSelectors from '../selectors';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import moment from 'moment';
import * as translationsHelpers from '../../translations/helpers';

import '../styles/Projects.scss';


type Props = {
  projects: Array<Project>,
};


const { translate } = translationsHelpers;
const dateFormat = translate('date.format');

class Projects extends PureComponent<Props> {
  render() {
    const { projects } = this.props;
    return (
      <div className="projects">
        <div>Projets</div>
        <div className="projects-table">
          <Row className="projects-header">
            <div className="projects-cell">Nom</div>
            <div className="projects-cell">Description</div>
            <div className="projects-cell">Début</div>
            <div className="projects-cell">Fin</div>
          </Row>
          {
            projects.map((project) => {
              const startProject = moment(project.startDate).startOf('day');
              const endProject = moment(project.endDate).startOf('day');
              return (
                <Row className="projects-row" key={project.id}>
                  <div className="projects-cell">{project.name}</div>
                  <div className="projects-cell">{project.description}</div>
                  <div className="projects-cell">{moment(project.startDate).startOf('day').format(dateFormat)}</div>
                  <div className="projects-cell">{moment(project.endDate).startOf('day').format(dateFormat)}</div>
                </Row>
              );
            })
          }
        </div>
      </div>
    )
  }
}



const mapState = (state: Object) => ({
  projects: projectsSelectors.projectsCollectionSelector(state),
});

export { Projects };
export default connect(mapState, null)(Projects);