import {
  fetchCharactersWithHomeworld,
  fetchHomeworldName,
  fetchResources,
  SWAPI_BASE_URL,
} from "../../api";
import { CharacterWithUrl, PaginatedResponse } from "../../types";
import fetch from "jest-fetch-mock";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe("API Functions", () => {
  describe("fetchHomeworldName", () => {
    it("should return the homeworld name for a valid URL", async () => {
      const mockResponse = { name: "Tatooine" };
      fetch.mockResponseOnce(JSON.stringify(mockResponse));

      const homeworldName = await fetchHomeworldName(
        "https://swapi.dev/api/planets/1/"
      );
      expect(homeworldName).toEqual("Tatooine");
      expect(fetch).toHaveBeenCalledWith("https://swapi.dev/api/planets/1/");
    });

    it("should throw an error for an invalid URL", async () => {
      fetch.mockRejectOnce(new Error("404 Not Found"));

      await expect(fetchHomeworldName("invalid-url")).rejects.toThrow(
        "404 Not Found"
      );
    });
  });

  describe("fetchCharactersWithHomeworld", () => {
    it("should return characters with homeworlds", async () => {
      type CharacterWithUrlWithoutId = Omit<CharacterWithUrl, "id">;
      const mockCharacterData: PaginatedResponse<CharacterWithUrlWithoutId> = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: "Luke Skywalker",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            url: "https://swapi.dev/api/people/1/",
          },
        ],
      };

      fetch.mockResponseOnce(JSON.stringify(mockCharacterData));
      fetch.mockResponseOnce(JSON.stringify({ name: "Tatooine" }));

      const response = await fetchCharactersWithHomeworld(SWAPI_BASE_URL);
      expect(response.characters.length).toBe(1);
      expect(response.characters[0].name).toEqual("Luke Skywalker");
      expect(response.characters[0].homeworld).toEqual("Tatooine");
      expect(response.count).toBe(1);
    });

    it("should throw an error if no characters are found", async () => {
      const mockEmptyData: PaginatedResponse<CharacterWithUrl> = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };

      fetch.mockResponseOnce(JSON.stringify(mockEmptyData));

      await expect(
        fetchCharactersWithHomeworld(SWAPI_BASE_URL)
      ).rejects.toThrow("Oops! Something went wrong...");
    });

    it("should handle fetch errors gracefully", async () => {
      fetch.mockRejectOnce(new Error("Network error"));

      await expect(
        fetchCharactersWithHomeworld(SWAPI_BASE_URL)
      ).rejects.toThrow("Network error");
    });
  });

  describe("fetchResources", () => {
    it("should return an array of resource names", async () => {
      const mockData = [
        { title: "A New Hope" },
        { title: "The Empire Strikes Back" },
      ];
      fetch.mockResponses(
        [JSON.stringify(mockData[0]), { status: 200 }],
        [JSON.stringify(mockData[1]), { status: 200 }]
      );

      const titles = await fetchResources(
        ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
        "title"
      );
      expect(titles).toEqual(["A New Hope", "The Empire Strikes Back"]);
    });

    it("should throw an error for an invalid resource URL", async () => {
      fetch.mockRejectOnce(new Error("404 Not Found"));

      await expect(fetchResources(["invalid-url"], "title")).rejects.toThrow(
        "404 Not Found"
      );
    });
  });
});
