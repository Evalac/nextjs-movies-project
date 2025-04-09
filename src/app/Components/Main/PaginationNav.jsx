"use client";

import { useRouter } from "next/navigation";

export default function PaginationNav({ page }) {
  return (
    <nav aria-label="Page navigation example" style={{ marginBottom: "20px" }}>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => {
              page--;
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
              page = page + 1;
            }}
          >
            {page === 1 ? page + 2 : page + 1}
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => {
              page++;
            }}
            href="#"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
