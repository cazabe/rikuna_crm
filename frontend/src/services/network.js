import axios from 'axios';

const enviroment = process.env.NODE_ENV;

const api = axios.create({
    //baseURL is a must to config the axios create method
    baseURL:
        enviroment === "development" ? "http://localhost:8000/api" : enviroment === "production" ? "production url" : ""
}
);

const apiPrivate = axios.create({
    //baseURL is a must to config the axios create method
    baseURL:
        enviroment === "development" ? "http://localhost:8000/api" : enviroment === "production" ? "production url" : ""
}
);

const addNetErrorHandler = (instance) => {
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status) {
                switch (error.response.status) {
                    case 401:
                        // It's natural that the login page gets a 401 for wrong credentials so do nothing in that page
                        if (!error.response.request.responseURL.includes("/auth/login")) {
                            window.location = "/login";
                        }
                        break;
                    case 404:
                        console.log("entre aqui");
                        window.location = "/404";
                        break;
                    case 500:
                        window.location = "/500";
                        break;
                    default:
                        break;
                }
            }

            return Promise.reject(error);
        }
    );
};
// Add interceptors to handle common errors and avoid spreading an error handler in every network request
addNetErrorHandler(apiPrivate);

export { api, apiPrivate }  