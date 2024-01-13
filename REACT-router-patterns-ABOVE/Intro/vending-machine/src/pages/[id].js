import {useRouter} from 'next/router'
import Chips from '@/components/Chips'
import Drink from "@/components/Drink";
import Snack from "@/components/Snack";

const Page = () => {
  const router = useRouter()
  const {id} = router.query
  console.log(id)

  if(id === 'Chips') return <Chips />
  if(id === 'Drink') return <Drink />
  if(id === 'Snack') return <Snack />
  return <div>Not Found</div>
}

export default Page