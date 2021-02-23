const axios = require('axios')
const Axios = axios.create({
  baseURL: "https://api.github.com",
});
Axios.interceptors.request.use((req) => {
  req.headers['Content-Type'] ='application/json'
  console.log(req);
  return req;
});

Axios
  .get("https://api.github.com/users/Ba5sx1a0sen1/followers", {
    params: { page: 1, per_page: 100 },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
