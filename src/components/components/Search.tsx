import { liteClient as algoliasearch } from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import { Hit } from "./hit";

const searchClient = algoliasearch("LO5KTJKIRN", "b01fac50913e9c285746a8b5da1295cb");

export const Search = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="pets_index"
    >
      <Configure hitsPerPage={3} />
      <div className="w-full max-w-screen-lg mx-auto overflow-hidden">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};