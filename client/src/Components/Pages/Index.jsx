import React, { useEffect } from 'react'
import { verifySession } from '../Session/session'
import { Container, Grid } from '@mui/material';
import './style.css'
import Databases from '../Database/Index'

export default function Index() {

  useEffect(() => {
    let session = verifySession();

    if (session === 'empty')
      window.location.href = "/";

  }, [])


  return (
    <div>
      <Grid container spacing={0}>
        <Grid item md={2} className='left'>
          <Container>
            <h4>Vendor Parts</h4>
            <br />
            <Databases />
          </Container>
        </Grid>
        <Grid item md={9} className='right'>
          <Container>
            <h4>Right</h4>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}
