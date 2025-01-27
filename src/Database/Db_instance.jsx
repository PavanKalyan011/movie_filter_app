import React from 'react'
import axios from 'axios'
const Db_instance = axios.create(
    {
        baseURL:"http://localhost:3000"
    }
)
  


export default Db_instance
