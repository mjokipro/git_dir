import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from 'next/link';

function Color() {
  const router = useRouter();
  const { name, value } = router.query;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        backgroundColor: value,
        width: "100vw",
        height: "100vh",
        position: "absolute",
      }}>
      <h1>This is {name}</h1>
      <Link href='/colors' style={{textDecoration: 'none'}}>
        <Button variant='contained'>Go Back</Button>
      </Link>
    </Grid>
  );
}

export default Color;
