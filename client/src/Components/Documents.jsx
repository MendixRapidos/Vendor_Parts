import React, { useEffect, useState } from 'react'
import { Table, Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DocumentEditor from './DocumentEditor';

export default function Documents(props) {

  let [Records, setRecords] = useState([{}])
  let [selectedRecord, setSelected] = useState({})




  useEffect(() => {
    fetchDocuments()

  }, [])


  let fetchDocuments = async () => {
    await axios.get(`http://localhost:5000/Documents`)
      .then((response) => {
        // console.log(response.data);
        setRecords(response.data);
      })
  }

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecords = Records.filter((record) => {
    const values = Object.values(record).join(' ').toLowerCase();
    return values.includes(searchQuery.toLowerCase());
  });

  const headers = Object.keys(filteredRecords[0] || {});

  const handleSelection = (record) => {
    props.handleToggle(record);
    // console.log(selectedRecord);
  }


  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col>
              <h3>Mendix.TC_Data</h3>
            </Col>
            <Col md={3}>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
            <Col md={1}>
              <button className='btn btn-primary' onClick={fetchDocuments}>Refresh</button>
            </Col>
          </Row>
        </Container>
        <br />

        <Button variant="primary" size="sm" onClick={props.handleToggle}>
          Add Part
        </Button>
        <br /><br />

        <Table striped bordered hover>
          <thead style={{position: 'sticky'}} bordered>
            <tr>
              {headers.map((key, index) => (
                <th key={index}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((key, colIndex) => (
                  <td key={colIndex}>{record[key]}</td>
                ))}
                <td>
                  <Button variant="primary" size="sm" onClick={() => { handleSelection(record) }}>Update</Button>
                </td>
              </tr>
            ))}


          </tbody>
        </Table>

      </section>

    </div>
  )
}
