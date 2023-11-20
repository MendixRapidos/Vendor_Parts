import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Database from './Database'
import Documents from './Documents';
import DocumentEditor from './DocumentEditor';

import './style.css'

export default function Index() {

  let [selectedCollection, setCollection] = useState({
    Database: '',
    collection: ''
  });

  let [Records, setRecords] = useState([{}])

  let selectCollection = (collection, Database) => {
    setCollection({
      Database: Database,
      collection: collection
    })
  }

  let [selectedRecord, setSelection] = useState();
  const [toggleEditor, setToggle] = useState(false);

  let handleToggle = (record) => {
    setToggle(!toggleEditor)
    setSelection(record);
  }



  return (
    <div>
      <Container>
        <Row>
          {/* <Col md={3}>
            <Database selectCollection={selectCollection} />
          </Col>
          <Col>
            {selectedCollection.Database !== '' && <Documents selectedCollection={selectedCollection} Records={Records}/>}
          </Col> */}
          <Col>
            <Documents handleToggle={handleToggle} />

          </Col>
        </Row>
      </Container>
      {toggleEditor && <DocumentEditor selectedRecord={selectedRecord} handleToggle={handleToggle}/>}
    </div>
  )
}
