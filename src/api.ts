import {
  CharacterWithUrl,
  CharactersResponse,
  PaginatedResponse,
} from "./types";

export const SWAPI_BASE_URL = "https://swapi.dev/api/people/";

export const fetchCharactersWithHomeworld = async (
  query: string,
  isSearch: boolean = false
): Promise<CharactersResponse> => {
  try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error(`Error fetching characters: ${response.statusText}`);
    }
    const data: PaginatedResponse<CharacterWithUrl> = await response.json();

    if (data.results.length < 1) {
      throw new Error(
        isSearch
          ? "Oops! That search didn't return anything..."
          : "Oops! Something went wrong..."
      );
    }

    const charactersWithHomeworldPromises = data.results.map(
      async (character: CharacterWithUrl) => {
        const homeworld = await fetchHomeworldName(character.homeworld);
        return {
          ...character,
          id: character.url.split("/").slice(-2, -1)[0],
          homeworld,
        };
      }
    );

    const charactersWithHomeworlds = await Promise.all(
      charactersWithHomeworldPromises
    );

    return {
      characters: charactersWithHomeworlds,
      count: data.count,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchHomeworldName = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching homeworld: ${response.statusText}`);
  }
  const data = await response.json();
  return data.name;
};

export const fetchResources = async (
  urls: string[],
  key: "title" | "name"
): Promise<string[]> => {
  return Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching resource: ${response.statusText}`);
      }
      const data = await response.json();
      return data[key];
    })
  );
};
