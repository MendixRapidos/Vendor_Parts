import React, { useEffect, useState } from 'react'
import { verifySession } from '../Session/session'
import axios from 'axios'
import { host } from '../Host/host'
import { Alert, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import './style.css'

export default function Index() {

  let [databases, setDatabases] = useState([])

  useEffect(() => {
    let session = verifySession();
    // console.log(session)
    fetchDatabases(session)


  }, [])


  let fetchDatabases = async (uri) => {
    // console.log(uri)
    await axios.get(host + `/databases`, { params: { uri: uri } })
      .then(async response => {
        console.log(await response.data);
        if (await response.data.status !== 201)
          document.getElementById('alert').style.display = 'block';
        else {
          setDatabases(await response.data.databasesList)
        }

        console.log(databases)
      })

  }

  return (
    <div className='Databases'>
      <p>List of Databases</p>
      <Alert severity='error' id='alert' style={{ display: 'none' }}>
        <strong>Error</strong><br />
        Connection Error</Alert>



      {databases.length == 0 ? <Alert severity='warning'></Alert> :
        <Table stickyHeader aria-label="sticky table" style={{ color: 'black' }}>
          <TableHead>
            <TableRow>
              {/* {databases.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                </TableCell>
              ))} */}
            </TableRow>
          </TableHead>
        </Table>

      }

    </div>
  )
}
