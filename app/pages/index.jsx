import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import FormField from "../components/FormField";
import { apiUrl } from "../utility/constant";

const RenderCards = ({ data, title }) => {
  if (data && data.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);

  return (
    <h2 className="mt-5 font-bold text-[#5449ff] text-xl-uppercase ">
      {title}
    </h2>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  const fetchAllPosts = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/v1/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const result = await res.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Images Generated So Far
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Here are some of the visually stunning images generated so far. Use the search bar to filter results.
          Images generated are by DALL-E- AI.
        </p>
      </div>

      <div className="mt-10">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75]">
                {" "}
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>{" "}
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No Search Results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Index;
