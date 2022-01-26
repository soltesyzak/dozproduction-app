import axios from 'axios';

export default axios.create({
    data: {
        baseUrl: "/doz-clients",
        headers: {
            ContentType: "application/json",
       } 
    }   
})