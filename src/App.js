import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import "./index.css";
import "./App.css";

const apiLink = process.env.REACT_APP_BACKEND_LINK;
function App() {
  let [keyword, setKeyword] = useState("");
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  const getWeather = async () => {
    console.log("keyword", keyword);
    let url = `${apiLink}?q=${keyword}`;
    let response = await fetch(url);
    let weatherData = await response.json();
    console.log("data city", weatherData.data);
    setData(weatherData.data);
    setLoading(false);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) =>
      getCurrentLocationWeather(pos.coords.longitude, pos.coords.latitude)
    );
  };

  const getCurrentLocationWeather = async (lon, lat) => {
    console.log(apiLink);
    let url = `${apiLink}?lat=${lat}&lon=${lon}`;
    let response = await fetch(url);
    let weatherData = await response.json();
    setData(weatherData.data);
    console.log(weatherData.data, weatherData.data.city.name);
    setLoading(false);
  };

  useEffect(() => {
    if (!keyword) getCurrentLocation();
  }, []);

  return (
    <div className="page">
      <Form
        inline
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
        }}
        style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}
      >
        <FormControl
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Search"
          className="mr-sm-2"
        />
        <Button variant="dark" type="submit">
          Search
        </Button>
      </Form>

      {loading ? (
        <div className="loader">
          <SyncLoader size={10} color={"black"} loading={loading} />
        </div>
      ) : !data ? (
        <div>"Data can't be found"</div>
      ) : (
        <div className="display">
          <div
            style={{ padding: "30px", fontSize: "40px", fontWeight: "bolder" }}
          >
            {data.city.name}
          </div>
          <div
            style={{
              height: "fit-content",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div className="panel left">
              <p>
                <b>
                  <u> Today : </u>
                </b>
              </p>
              <div>
                <div className="leftItem">
                  <div>{moment(data.list[0].dt_txt).format("ll")}</div>

                  <img
                    src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                  <div>{data.list[0].main.temp}ºC -&nbsp;</div>
                  <div>{data.list[0].weather[0].description}</div>
                </div>
              </div>
            </div>
            <div className="panel right">
              <p>
                <b>
                  <u>Next 4 days :</u>
                </b>
              </p>
              <div className="nextForecast">
                <div className="forecastItem">
                  <div>{moment(data.list[8].dt_txt).format("ll")}</div>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                  <div>{data.list[8].main.temp}ºC</div>
                  <div>{data.list[8].weather[0].description}</div>
                </div>
                <div className="forecastItem">
                  <div>{moment(data.list[16].dt_txt).format("ll")}</div>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                  <div>{data.list[16].main.temp}ºC</div>
                  <div>{data.list[16].weather[0].description}</div>
                </div>
                <div className="forecastItem">
                  <div>{moment(data.list[24].dt_txt).format("ll")}</div>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                  <div>{data.list[24].main.temp}ºC</div>
                  <div>{data.list[24].weather[0].description}</div>
                </div>
                <div className="forecastItem">
                  <div>{moment(data.list[32].dt_txt).format("ll")}</div>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                  <div>{data.list[32].main.temp}ºC</div>
                  <div>{data.list[32].weather[0].description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
