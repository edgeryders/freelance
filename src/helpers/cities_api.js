import countries from '../data/countries.json'
import axios from "axios";

const ajaxFindCountry = function(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

    axios({
    "method":"GET",
    "url":"http://geodb-free-service.wirefreethought.com/v1/geo/cities",
    "params":{
      "namePrefix":query,
      "sort":"-population,name"
    }
    })
    .then((response)=>{
      window.console.log(response);
        const results = response.data.data.filter((element, index, array) => {
        return element.name.toLowerCase().includes(query.toLowerCase())
      })
      resolve(results)
    })
    .catch((error)=>{
      window.console.log(error)
    })


    }, 1000)
  })
}

export default ajaxFindCountry
