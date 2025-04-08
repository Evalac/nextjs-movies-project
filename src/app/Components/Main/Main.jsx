"use client";

import { fetchRequestMovies } from "@/service/apiMovies";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeMain(params) {
  const [page, setPage] = useState(1);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetchRequestMovies("popular", `&page=${page}`)
      .then((data) => {
        if (data.results) {
          setMoviesData(data.results);
        }
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <div className="container-lg">
      <div
        className="row row-cols-1 row-cols-md-5 g-4"
        style={{ marginBottom: "20px" }}
      >
        {moviesData.map((movie) => (
          <div key={movie.id} className="col">
            <Link
              href={`/moviesdetails/${movie.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card h-100">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <nav
        aria-label="Page navigation example"
        style={{ marginBottom: "20px" }}
      >
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => {
                setPage((prevState) => prevState - 1);
              }}
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              {page === 1 ? 1 : page - 1}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              {page === 1 ? page + 1 : page}
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setPage((prevState) => (prevState = page + 1));
              }}
            >
              {page === 1 ? page + 2 : page + 1}
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                setPage((prevState) => prevState + 1);
              }}
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
