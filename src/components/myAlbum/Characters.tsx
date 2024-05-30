import { useEffect, useState } from "react";
import { DataLaminates } from "../../models/DataModel";
import ReactPaginate from "react-paginate";
import { useLocalStorage } from "../../services/useLocalStorage";
import { useFetch } from "../../services/useFetch";
import { getAllData } from "../../services/getPaginationData";

export const Characters = () => {
  const { count } = useFetch("https://swapi.dev/api/people");

  const { getData } = useLocalStorage("Characters");

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTotalCount(Math.ceil(count / 10));
    if (getData()) return setLoading(false);
    (async () => {
      try {
        const allData = await getAllData(
          `https://swapi.dev/api/people/?page=1`,
          "people"
        );
        window.localStorage.setItem(
          "Characters",
          JSON.stringify(
            Array.from({ length: allData.length }, (_, i) => ({
              id: parseInt(allData[i].url.match(/\d+/)),
              page: Math.ceil((i + 1) / 10),
              category: i <= 19 ? "Especial" : "Regular",
              type: "Characters",
              isEmpty: true,
            }))
          )
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [count]);

  const handlePageClick = async (data: { selected: number }) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div className="wrapper-container z-1 position-relative">
      <h2 className="text-warning">Characters:</h2>
      <div className="d-flex justify-content-center">
        {loading && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div className="wrapper-cards">
      <div className="container-cards">
        {(getData() as DataLaminates[])?.map((item, index) =>
          currentPage === item.page ? (
            <div
              key={index}
              className="card col-md-4 v my-2"
            >
              <div className="card-body">
                {item.name ? (
                  <h5 className="card-title">{item.category}</h5>
                ) : undefined}
                {item.name ? (
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {item.name}
                  </h6>
                ) : undefined}
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {item.id}
                </h6>
                {item.name ? (
                  <a href="#" className="card-link">
                    Ver detalles
                  </a>
                ) : undefined}
              </div>
            </div>
          ) : undefined
        )}
      </div>
      </div>
      <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        breakLabel={"..."}
        pageCount={totalCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-5"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};
