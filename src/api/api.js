export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "5c1c62e0dbfa3242e2743dce06eb82ab";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzFjNjJlMGRiZmEzMjQyZTI3NDNkY2UwNmViODJhYiIsInN1YiI6IjYwZGM3MWMwYjQ1OGI4MDA0NmM5ODhhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FBC-t5Vb-llrTnuUomNnK7MavhC5bgnC6tPxEsOYVEM";

  export const fetchApi = (url, options = {}) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => {
          if (response.status < 400) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(response => {
          response.json().then(error => {
            reject(error);
          });
        });
    });
  };
