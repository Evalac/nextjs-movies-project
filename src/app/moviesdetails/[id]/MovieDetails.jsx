"use client";

import { useEffect, useState } from "react";
import { fetchRequestMovies } from "@/service/apiMovies";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MovieDetails() {
  const [moviesDetails, setMoviesDetails] = useState(null); // спочатку null
  const [loading, setLoading] = useState(true); // додали стан завантаження
  const [error, setError] = useState(null); // для зберігання помилок
  const [activeTab, setActiveTab] = useState("none");
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchRequestMovies(`${id}`)
      .then((data) => {
        if (data) {
          setMoviesDetails(data); // зберігаємо лише перший елемент
          console.log(data);
        } else {
          setMoviesDetails(null); // якщо даних немає, ставимо null
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false)); // поставили setLoading(false) в finally
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // показуємо повідомлення про завантаження
  }

  if (error) {
    return <p>Error: {error.message}</p>; // обробка помилок
  }

  if (!moviesDetails) {
    return <p>No movie details found.</p>; // якщо дані не знайдені
  }

  return (
    <section>
      <div
        className="card mb-3"
        style={{
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`}
              className="img-fluid rounded-start"
              alt="poster"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{moviesDetails.title}</h5>
              <p className="card-text">Overview: {moviesDetails.overview}</p>
              <p className="card-text">Release: {moviesDetails.release_date}</p>
              <p className="card-text">Runtime: {moviesDetails.runtime}min.</p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setActiveTab("actors")}
          >
            Actors
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => setActiveTab("similar")}
          >
            Similar Movies
          </button>
        </div>
        <div className="card-body">
          {activeTab === "actors" && (
            <div>
              <h5>Actors (coming soon)</h5>
              <p>Тут буде список акторів…</p>
            </div>
          )}
          {activeTab === "similar" && (
            <div>
              <h5>Similar Movies (coming soon)</h5>
              <p>Тут будуть схожі фільми…</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
