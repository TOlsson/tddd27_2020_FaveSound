import axios from 'axios'
export default() => {
  return axios.create({
    baseURL: `https://19f45e3f.eu.ngrok.io/` // the url of our server
  })
}
