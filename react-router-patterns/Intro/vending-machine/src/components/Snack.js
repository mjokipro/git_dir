import Link from 'next/link';
import Grid2 from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Button from "@mui/material/Button";

function Snack() {

  let srcCandy = 'https://m.media-amazon.com/images/I/71n6KA6mwRL._SL1000_.jpg'

  return (
    <div>
      <Grid2 container justifyContent='center' direction='column' alignItems='center' style={{height: '80vh'}}>

        <Image
          loader={() => srcCandy}
          src= {srcCandy}
          alt="LifeSaver Gummies"
          width="300"
          height="300"
        />

        <Link href='/' style={{textDecoration: 'none', margin: '1rem'}}>
          <Button variant='contained' color='error'>Go Back</Button>
        </Link>
      </Grid2>
    </div>
  )
}

export default Snack;