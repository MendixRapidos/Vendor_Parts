import { React, useEffect, useState } from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios'
import { notifySuccess, notifyFail } from './Notification'

export default function DocumentEditor(props) {
  // console.log(props.selectedRecord);
  let _id = (props.selectedRecord._id) || '';
  let Item_Name = props.selectedRecord.Item_Name || '';
  let Item_ID = props.selectedRecord.Item_ID || '';
  let itemRevisionID = props.selectedRecord.itemRevisionID || '';
  let CreationDate = props.selectedRecord.CreationDate || new Date().toLocaleString();
  let ReleasedDate = props.selectedRecord.ReleasedDate || '';
  let Description = props.selectedRecord.Description || '';
  let String = props.selectedRecord.String || '';
  let UID = props.selectedRecord.UID || '';

  let [formData, setFormData] = useState({
    _id: _id,
    Item_Name: Item_Name,
    Item_ID: Item_ID,
    itemRevisionID: itemRevisionID,
    CreationDate: CreationDate,
    ReleasedDate: ReleasedDate,
    Description: Description,
    String: String,
    UID: UID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/record`, formData)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          notifySuccess('Transaction Success');
          window.location.reload();
          props.handleToggle();
        }
        else
          notifyFail('Transaction Fail')
      })
    // console.log(formData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
      await axios.patch(`http://localhost:5000/record/update`, formData)
      .then((response) => {
        console.log(response.status);
        if (response.data == '200') {
          notifySuccess('Transaction Success');
          props.handleToggle();
          window.location.reload();
          props.handleToggle();
        }
        else
          notifyFail('Transaction Fail')
      })
    
  }

  return (
    <div className='DocumentEditor'>
      <div className="box">
        <Container>
          <Row>
            <Col>
              {formData._id === '' ? <h4>Submit Data</h4> : <h4>Update Data</h4>}
            </Col>
            <Col>
              <p className='close-btn' onClick={props.handleToggle}>Close</p>
            </Col>
          </Row>
          <hr />

          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                {formData._id !== '' &&
                  <>
                    <label>_id</label>
                    <br />
                    <input type="text" name="_id" value={formData._id} onChange={handleChange} disabled style={{ cursor: 'not-allowed', background: '#cbdcfe' }} />
                    <br />
                  </>
                }
                {formData._id !== '' ?
                  <>
                    <label>Item ID</label>
                    <br />
                    <input type="text" name="Item_ID" value={formData.Item_ID} onChange={handleChange} disabled style={{ cursor: 'not-allowed', background: '#cbdcfe' }} />
                    <br />
                  </> :
                  <>
                    <label>Item ID</label>
                    <br />
                    <input type="text" name="Item_ID" value={formData.Item_ID} onChange={handleChange} />
                    <br />
                  </>
                }

                <label>Item Name</label>
                <br />
                <input type="text" name="Item_Name" value={formData.Item_Name} onChange={handleChange} required />
                <br />
                <label>
                  Item Revision
                </label>
                <br />
                <input type="text" name="itemRevisionID" value={formData.itemRevisionID} onChange={handleChange} required />
                <br />
              </Col>
              <Col>
                <label>
                  Creation Date
                </label>
                <br />
                <input type="da" name="CreationDate" value={formData.CreationDate} onChange={handleChange} disabled style={{ cursor: 'not-allowed', background: '#cbdcfe' }} />
                <br />
                {formData._id !== '' &&
                  <>
                    <label>
                      Released Date
                    </label>
                    <br />
                    <input type="text" name="ReleasedDate" value={formData.ReleasedDate} onChange={handleChange} disabled style={{ cursor: 'not-allowed', background: '#cbdcfe' }} />
                    <br />
                  </>
                }

                <label>
                  Description
                </label>
                <br />
                <textarea type="text" name="Description" value={formData.Description} onChange={handleChange} rows="4" cols="50" />
                <br />
              </Col>
            </Row>

            <br />
            {props.selectedRecord._id === undefined ? <button type="submit" className='btn btn-success'>Submit</button> : <button type="button" className='btn btn-success' onClick={handleUpdate}>Update</button>}
          </form>

        </Container>

      </div>
    </div>
  )
}
