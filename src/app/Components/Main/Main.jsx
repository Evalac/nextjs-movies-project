import { fetchRequestMovies } from "@/service/apiMovies";
import PaginationNav from "./PaginationNav";
import Link from "next/link";
// в кліенських компонентах де треба робити запити робимо асинхролнні функціїї
export default async function HomeMain(params) {
  const page = parseInt(params.page) || 1;
  console.log(" page: ", page);
  const data = await fetchRequestMovies("popular", `&page=${page}`);
  const movies = data?.results || [];

  return (
    <div className="container-lg">
      <div
        className="row row-cols-1 row-cols-md-5 g-4"
        style={{ marginBottom: "20px" }}
      >
        {movies.map((movie) => (
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
      <PaginationNav page={page} />
    </div>
  );
}
