import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Weather = () => {
  const [weatherDetails, setWeatherDetails] = useState(0)
  const [weatherDetailsAPI, setWeatherDetailsAPI] = useState(0)

  const places = weatherDetails
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${places}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`


  const commonAPI = async (httpmethod, url, reqBody) => {
    const requestConfig = {
      method: httpmethod,
      url,
      data: reqBody,

    }
    return await axios(requestConfig).then((res) => {
      return res
    }
    ).catch(err => {
      return err
    })
  }

  const uploadWeatherAPI = async () => {
    return await commonAPI("GET", WEATHER_URL, "")
  }

  useEffect(() => {
    uploadWeatherAPI()
  }, [])


  const getWeatherDetails = async () => {
    const response = await uploadWeatherAPI()
    console.log(response.data);
    setWeatherDetailsAPI(response.data)

    //  console.log(uploadWeatherAPI);

  }





  return (

    <>
      <div style={{ height: '100vh' }} className='home d-flex justify-content-center align-items-center flex-column '>
        <div className=" d-flex justify-content-center">
          <TextField onChange={e => setWeatherDetails(e.target.value)} className='w-100 border border-primary rounded shadow' label="Enter a Place" />
          <Button onClick={getWeatherDetails} className='ms-3 bg-primary fw-bolder shadow text-white' variant='outlined'>Search</Button>

        </div>

        {
          weatherDetailsAPI ?
            <div style={{ marginTop: '100px' }} className='card w-25  d-flex justify-content-center flex-column rounded-5 bg-dark shadow-lg'>

              <div className="d-flex justify-content-between align-items-center  mt-3 text-5 ">
                <h5 className="fs-3 text-white shadow p-1 ms-3"><i class="fa-solid fa-location-dot text-danger me-1"></i>{weatherDetailsAPI.name}</h5>
                <h5 className="fs-4 text-white  p-1 me-3"><i class="fa-solid fa-earth-asia me-1 text-primary"></i>{weatherDetailsAPI.sys.country}</h5>


              </div>


              <div className="d-flex flex-column text-center mt-2 mb-4 ">
                <h5 className=" temp display-4 mb-0 ">{weatherDetailsAPI.main.temp}°C </h5>
                <span style={{ fontWeight: '600', fontSize: '30px' }} className="small text-black" >{weatherDetailsAPI.weather.map((item) => item.main)}</span>
              </div>

              <div style={{ fontSize: '25px' }} className="d-flex align-items-center justify-content-center flex-row text-white mt-5  mb-5">

                <div><i class="fa-solid fa-temperature-half me-1 text-warning"></i> <span className="me-4"> {weatherDetailsAPI.main.feels_like}°C
                </span></div>
                <div><i className="fas fa-wind fa-fw text-success"></i> <span className="me-3 "> {weatherDetailsAPI.wind.speed}km/h
                </span>
                </div>
                <div><i className="fas fa-tint fa-fw text-info"></i> <span className="me-2"> {weatherDetailsAPI.main.humidity}%
                </span></div>



              </div>
            </div>
            :
            ""
        }


      </div>
    </>
  )
}

export default Weather


