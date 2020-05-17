import axios from 'axios'
export default() => {
  return axios.create({
    // baseURL: `https://favesound.herokuapp.com/` // the url of our heroku server
    baseURL: 'http://localhost:5000/'
  })
}
