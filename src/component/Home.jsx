import { Button, Input, List, ListItem } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { country, random } from "../redux/Action";
import { Loder } from "./Loder";

export default function Home() {
  const [input, setInput] = useState("");
  const state = useSelector((state) => state);
  const getData = useSelector((state) => state.getData);
  const [space] = useState("          ");
  const [status, setstatus] = useState(false);
  const dispatch = useDispatch();
  const inputHandler = (evt) => {
    const temp = evt.target.value;
    setInput(temp);
  };
  const submitHandler = () => {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=rchOydRl6eFK1Lzgw97e42BagIw1lMRCbruF9R37`;
    dispatch(country(url));
    setstatus(true);
  };
  const randomHandler = () => {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=rchOydRl6eFK1Lzgw97e42BagIw1lMRCbruF9R37`;
    dispatch(random(url));
    setstatus(true);
  };
  const render = () => {
    if (state.loading === true) {
      return <Loder />;
    } else if (state.error !== null) {
      return (
        
        <div class="error-message">
  <p>ID is not found</p>
  <p>Please <a href="#">try again</a> later.</p>
</div>
        // <div className="error-message">
        //   <h1> ID IS NOT FOUND </h1>
        //   <h1> 404 ERROR </h1>
        // </div>
      );
    } else {
      return (
        <div className="display">
          <h1> Asteroid Deatial </h1>

          <hr />
          <List>
            <ListItem>
              <label>
                <h3>Name : </h3>
              </label>
              {space}
              <h3>{getData.name}</h3>
            </ListItem>
            <hr />
            <ListItem>
              <label>
                <h3>Nasa_Jpl_Url : </h3>
              </label>
              {space}
              <h3>
                <Button
                  href={getData.nasa_jpl_url}
                  variant="outlined"
                  color="primary"
                  target="_blank"
                >
                  {" "}
                  URL{" "}
                </Button>
              </h3>
            </ListItem>
            <hr />
            <ListItem>
              <label>
                <h3>Is_Potentially_Hazardous_Asteroid : </h3>
              </label>
              {space}
              <h3> {getData?.is_potentially_hazardous_asteroid?.toString()}</h3>
            </ListItem>
            <hr />
          </List>
        </div>
      );
    }
  };

  return (
    <div>
      <Input
        placeholder="Enter Asteroid ID"
        onChange={inputHandler}
        color="primary"
        type="number"
      ></Input>
      <Button
        variant="outlined"
        color="primary"
        onClick={submitHandler}
        disabled={input.length === 0 ? true : false}
      >
        Submit
      </Button>
      <Button variant="outlined" color="primary" onClick={randomHandler}>
        Random
      </Button>

      {status ? render() : null}
    </div>
  );
}
