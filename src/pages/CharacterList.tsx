import { Heading, Box, Text, Button, Spinner, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Character } from "../types";
import CharacterCard from "../components/CharacterCard";
import { fetchCharactersWithHomeworld, SWAPI_BASE_URL } from "../api";

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const query = `${SWAPI_BASE_URL}?page=${currentPage}`;
        const { characters, count } = await fetchCharactersWithHomeworld(query);
        setCharacters(characters);
        setLastPage(Math.ceil(count / 10));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(
            "Hopefully you never see this, but an unknown error has occurred"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handleSearch = async () => {
    try {
      const query = `${SWAPI_BASE_URL}?search=${searchTerm}`;
      const { characters, count } = await fetchCharactersWithHomeworld(query);
      setCharacters(characters);
      setLastPage(Math.ceil(count / 10));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Hopefully you never see this, but an unknown error has occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (loading)
    return (
      <div>
        <p>gwooarrhhc (That's Wookie for 'loading...')</p>
        <Spinner />
      </div>
    );

  return (
    <div>
      <Input
        size="md"
        maxW="40%"
        type="text"
        placeholder="Enter search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button h="1.75rem" size="sm" gap={4} onClick={handleSearch}>
        Search
      </Button>
      {error && <Text color="red.500">{error}</Text>}

      {characters && (
        <Heading size="lg" mb={2}>
          Characters
        </Heading>
      )}

      <Box display="flex" flexWrap="wrap" gap={4} p={4}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Box>
      <div data-testid="pagination_controls">
        <Button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === lastPage}
        >
          Next
        </Button>
        <Text>
          Page {currentPage} of {lastPage}
        </Text>
      </div>
    </div>
  );
};

export default CharacterList;
