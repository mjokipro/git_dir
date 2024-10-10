import React, {useState, useEffect} from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import SnackOrBoozeApi from "./Api";


function Home() {

const [totItems, setTotItems] = useState()
const [drinks, setDrinks] = useState()
const [snacks, setSnacks] = useState()

useEffect(() => {
  const getTotItems = async () => {
    const {snacks, drinks, totItems} = await SnackOrBoozeApi.getTotItems()
    
    setTotItems(totItems)
    setDrinks(drinks)
    setSnacks(snacks)
  }
  getTotItems()
}, [])

console.log("totItems",totItems)
console.log("snacks", snacks)
console.log("drinks", drinks)

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <div>
              Total Items Sold:  {totItems}
            </div>
            <div>
              Total Snacks Sold:  {snacks}
            </div>
            <div>
              Total Drinks Sold:  {drinks}
            </div>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
