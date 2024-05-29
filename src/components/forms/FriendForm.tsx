import { useState, useEffect } from "react";
import { Input } from "@/components/ui";
import useDebounce from "@/hooks/useDebounce";
import { Loader } from "@/components/shared";
import { useGetUserByUserName } from "@/lib/react-query/queries";
import ShowFriendList from "../shared/ShowFriendList";
import { geByUsername } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/AuthContext";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedFriends: any;
};

const SearchResults = ({
  isSearchFetching,
  searchedFriends,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedFriends) {
    return <ShowFriendList list={searchedFriends} />;
  } else {
    return (
      <span className="text-light-4 mt-5 text-center w-full">
        No results found
      </span>
    );
  }
};

const FriendForm = () => {
  const { user } = useUserContext();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedFriends, isFetching: isSearchFetching } =
    useGetUserByUserName(debouncedSearch);
  const [friendSuggestions, setFriendSuggestions] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const friendUserList = ["yogesh21", "pawan21", "nayan21", "john21"];

  useEffect(() => {
    const fetchFriendSuggestions = async () => {
      setIsLoading(true);
      const friendData = await Promise.all(
        friendUserList.map(async (username) => {
          try {
            const user = await geByUsername(username);
            return user;
          } catch (error) {
            console.error(`Error fetching user data for ${username}:`, error);
            return null;
          } finally {
          }
        })
      );
      setFriendSuggestions(friendData.filter((user) => user !== null));
      setIsLoading(false);
    };

    fetchFriendSuggestions();
  }, []);
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
            placeholder="Find Friends By Username"
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
          <>
            <span className="text-light-1 mt-5 text-center w-full">
              Friends Suggestions
            </span>
            {isLoading ? <Loader /> : null}
            <div
              style={{ maxHeight: "370px", overflowY: "auto" }}
              className="custom-scrollbar">
              {!isLoading && (
                <>
                  {friendSuggestions.map(
                    (friend, index) =>
                      user.name !== friend.name && (
                        <SearchResults
                          key={index}
                          isSearchFetching={false}
                          searchedFriends={friend}
                        />
                      )
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendForm;
