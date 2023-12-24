import { useState } from "react";
import { Input } from "@/components/ui";
import useDebounce from "@/hooks/useDebounce";
import {  Loader } from "@/components/shared";
import {  useGetUserByUserName } from "@/lib/react-query/queries";
import ShowFriendList from "../shared/ShowFriendList";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedFriends: any;
};

const SearchResults = ({ isSearchFetching, searchedFriends }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedFriends) 
  {
    return <ShowFriendList list={searchedFriends} />;
  } else {
    return (
      <p className="text-light-4 mt-5 text-center w-full">No results found</p>
    );
  }
};


const FriendForm = () => {  
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedFriends, isFetching: isSearchFetching } = 
  useGetUserByUserName(debouncedSearch);

  const shouldShowSearchResults = searchValue !== "";

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Friend</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="mt-5">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedFriends={searchedFriends}
          />
        ) : (
             <p className="text-light-3 mt-10 text-center w-full">Find Friends By Username</p>
            )  
        }
      </div>
    </div>
  );
};

export default FriendForm;
