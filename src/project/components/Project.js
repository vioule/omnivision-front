// @flow
import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import moment from 'moment';
import * as translationsHelpers from '../../translations/helpers';
import { useLocation } from 'react-router';

import '../styles/Project.scss';

const { translate } = translationsHelpers;
const dateFormat = translate('date.format');


const Project = () => {
  const { pathname } = useLocation()
  const { collection } = useSelector(({ PROJECT: { projects: projects } }) => projects)
  const [content, setContent] = useState(null)
  const [id, setID] = useState(0)
  useEffect(() => { setID(pathname.split('/')) }, [pathname])
  useEffect(() => {
    if (collection) {
      setContent(collection.find(project => project.id === parseInt(id[id.length - 1])))
    }
  }, [collection, id])
  return (
    <div className="project">
      {content && <>
        <div>{content.name}</div>
        <div className="project-info">
          <Row className="">
            <div className="project-info-cell">
              <div className="">Description :</div>
              <div className="">{content.description}</div>
            </div>
            <div className="project-info-cell">
              <div className="">Nb de jours :</div>
              <div className="">{content.days}</div>
            </div>
            <div className="project-info-cell">
              <div className="">Début :</div>
              <div className="">{moment(content.startDate).startOf('day').format(dateFormat)}</div>
            </div>
            <div className="project-info-cell">
              <div className="">Fin :</div>
              <div className="">{moment(content.endDate).startOf('day').format(dateFormat)}</div>
            </div>
          </Row>
        </div>
        <div className="project-resources">
          <div>Liste des ressources</div>
          <div className="project-table">

            <Row className="projects-header">
              <div className="project-cell">Nom</div>
              <div className="project-cell">Description</div>
              <div className="project-cell">Nb de jours</div>
            </Row>
            {
              content.resources.map((resource, i) => {
                return (
                  <Row className="projects-row" key={i}>
                    <div className="project-cell">{resource.name}</div>
                    <div className="project-cell">{resource.description}</div>
                    <div className="project-cell">{resource.days}</div>
                  </Row>
                );
              })
            }
          </div>
        </div>

      </>}
    </div>
  )
}

export default Project