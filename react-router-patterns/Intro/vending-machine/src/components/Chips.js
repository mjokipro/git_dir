import {useState} from "react";
import Link from 'next/link';
import Button from '@mui/material/Button';
import Grid2 from "@mui/material/Unstable_Grid2";
import Image from "next/image";


function Chips() {
  let [count, setCount] = useState(0);

  const handleButton = () => {
    setCount(count += 1);
  };

  let srcChips = 'https://target.scene7.com/is/image/Target/GUEST_dd894bfa-cafc-445e-9f8b-f5aa44b9a32d?wid=725&hei=725&qlt=80&fmt=webp'

  return(
    <Grid2 container direction='column' spacing={2} justifyContent='center' alignItems='center' style={{height: '80vh'}}>

      <Image
        loader={() => srcChips}
        src={srcChips}
        alt="Lays Chips"
        width="300"
        height="300"
      />

      <Grid2 >
        <h3>Counter: {count}</h3>
      </Grid2>

      <Grid2 >
        <Button color='success' variant='contained' onClick={handleButton} style={{width: '125px'}}>Eat Chips</Button>
      </Grid2>

      <Grid2>
      <Link style={{textDecoration: 'none'}} href='/'>
        <Button color='error' variant='contained' style={{width: '125px'}}>Go Back</Button>
      </Link>
      </Grid2>
    </Grid2>
  )
}

export default Chips;