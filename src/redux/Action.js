import { GET_API } from "../service/ApiService";
import * as actions from "./ActionType";

export const country = (url) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_REQUEST });
    try {
      const res = await GET_API(url);
      const {
        name,
        nasa_jpl_url,
        is_potentially_hazardous_asteroid,
      } = res.data;
      const obj = { name, nasa_jpl_url, is_potentially_hazardous_asteroid };
      dispatch({ type: actions.GET_SUCCESS, payload: obj });
    } catch (error) {
      dispatch({ type: actions.GET_FAILURE, error: error });
    }
  };
};

export const random = (url) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_REQUEST });
    try {
      const res = await GET_API(url);
      const data = res.data.near_earth_objects;
      const obj = data[Math.floor(Math.random() * 20)];
      const id = obj.id;
      const urls = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=rchOydRl6eFK1Lzgw97e42BagIw1lMRCbruF9R37`;

      dispatch(country(urls));
    } catch (error) {
      dispatch({ type: actions.GET_FAILURE, error: error });
    }
  };
};
