import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedCategory(
      event.target.value === "all" ? null : event.target.value
    );
    setCurrentPage(1); // Reset to the first page on category change
  };

  const handleClick = (event) => {
    setSelectedCategory(
      event.target.value === "all" ? null : event.target.value
    );
    setCurrentPage(1); // Reset to the first page on button click
  };

  const calculatePageRange = (length) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex =
      startIndex + itemsPerPage > length ? length : startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems().length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredItems = () => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          experienceLevel === selectedCategory ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase() ||
          postingDate === selectedCategory
      );
    }

    return filteredJobs;
  };

  const result = filteredItems();
  const { startIndex, endIndex } = calculatePageRange(result.length);
  const paginatedResult = result.slice(startIndex, endIndex);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading..</p>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">
                Showing {paginatedResult.length} of {result.length} Jobs
              </h3>
              {paginatedResult.length > 0 ? (
                paginatedResult.map((data, i) => <Card key={i} data={data} />)
              ) : (
                <p>No Jobs Found</p>
              )}
            </>
          )}

          {result.length > itemsPerPage && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {Math.ceil(result.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(result.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded">Right</div>
      </div>
    </div>
  );
};

export default Home;
