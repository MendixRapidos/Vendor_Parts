import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import axios from 'axios'
import './style.css'
import { host } from '../Host/host';
import { createSession, verifySession } from '../Session/session';
import { Card, Button, CardContent, CardActions, Alert } from '@mui/material';

export default function Index(props) {

  useEffect(() => {
    let session = verifySession();

    if (session != 'empty')
      window.location.href = '/Home'

  }, [])

  let [uri, setUri] = useState('');


  let handleChange = (e) => {
    setUri(e.target.value);
    document.getElementById('uri').style.borderColor = ''
    document.getElementById('alert').style.display = 'none'

    document.getElementById('message').innerHTML = ''
  }

  let handleConnect = async () => {
    if (uri === '') {
      document.getElementById('uri').style.borderColor = 'red'
      document.getElementById('alert').style.display = 'block'
      document.getElementById('message').innerHTML = 'This field is required'
    }
    else {
      props.handleLoading(true);
      let myObj = {
        uri: uri
      }
      await axios.post(host + "/connect", myObj)
        .then(async response => {
          console.log(response.data)
          if (await response.data.status == 201) {
            props.handleLoading(false);
            createSession(uri)
            window.location.reload();
          }
          else {
            props.handleLoading(false);
            document.getElementById('uri').style.borderColor = 'red'
            document.getElementById('alert').style.display = 'block'

            document.getElementById('message').innerHTML = "Invalid URI";
          }
        })
    }

  }

  return (
    <div className='Connection'>
      <Card variant="outlined" className='Box'>
        <CardContent>
          <h2 className='heading'>Connect to Vendor Part</h2>
          <p>New Connection</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>URI</Form.Label>
              <Form.Control as="textarea" rows={3} name='uri' value={uri} onChange={handleChange} id='uri' />
            </Form.Group>

          </Form>
          <Alert severity="error" id='alert' style={{ display: 'none' }}>
            <span id='message'></span>
          </Alert>

        </CardContent>
        <CardActions>
          <Button variant="contained" color="success" className='btn-connect' onClick={handleConnect}>Connect</Button>
        </CardActions>

      </Card>
    </div >
  )
}
