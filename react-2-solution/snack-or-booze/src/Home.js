import React, { useState, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import SnackOrBoozeApi from './Api';


function Home() {
  const [itemsOffered, setItemsOffered] = useState();
  const [snacksOffered, setSnacksOffered] = useState();
  const [drinksOffered, setDrinksOffered] = useState();

  useEffect(() => {
    const getTotalItems = async () => {
      let {totalItems, drinks, snacks} = await SnackOrBoozeApi.getTotalCount();
      
      setItemsOffered(totalItems);
      setSnacksOffered(snacks);
      setDrinksOffered(drinks);
      
    }
    getTotalItems();
  }, []);

  console.log(itemsOffered)

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <CardText className='text-center'>
            { itemsOffered !== null && snacksOffered !== null && drinksOffered !== null 
             ?
              <div>
                <h1>We currently carry: {itemsOffered} different items!</h1>
                <h3>There are: {snacksOffered} snacks available!</h3>
                <h3>There are: {drinksOffered} drinks available!</h3>
              </div>
             :
              <h2>Loading...</h2>
          }
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
