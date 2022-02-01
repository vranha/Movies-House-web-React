const API = "https://api.themoviedb.org/3";


// FUNCION PARA USAR LA LLAMADA A LA API DESDE TODA LA APP
export function get(path) {
  return fetch(API + path, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTcxY2IzMDJiODk5ODJiYjhmZDIyZjJiMWUwZDU4YiIsInN1YiI6IjYxZTk5ZjYwMzE2NDRiMDAxYjkyZTcxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uZAdo9mGQPcvSfvgSzFmWg2rCtOP0x7e5wqeM10v_-U",
      "Content-Type": "application/json;charset=utf-8'",
    },
  }).then((result) => result.json());
}
