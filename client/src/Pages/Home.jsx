import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // console.log(jobs);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  // console.log(filteredItems);

  //////radio filter------------------------------

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  /////button based filter

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  ////main function

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    //filtering input
    if (query) {
      filteredJobs = filteredItems;
    }

    ///category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          experienceLevel === selected ||
          salaryType.toLowerCase() === selected.toLowerCase ||
          employmentType.toLowerCase() === selected.toLowerCase() ||
          postingDate === selected
      );
      console.log(filteredJobs);
    }
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);
  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4">
        <div>Left</div>
        <div>
          <Jobs result={result} />{" "}
        </div>
        <div>Right</div>
      </div>
    </div>
  );
};

export default Home;
