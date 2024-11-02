import { render, screen, fireEvent } from "@testing-library/react";
import CharacterDetails from "../../pages/CharacterDetails";
import { FavouritesContext } from "../../context_providers/FavouritesContext";
import fetch from "jest-fetch-mock";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("CharacterDetails Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("displays a loading spinner while fetching data", () => {
    render(<CharacterDetails />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays character details after data is fetched", async () => {
    const mockCharacter = {
      id: "1",
      name: "Luke Skywalker",
      gender: "male",
      homeworld: "Tatooine",
      hairColor: "blond",
      eyeColor: "blue",
      films: ["A New Hope", "The Empire Strikes Back"],
      starships: ["X-wing", "Imperial Shuttle"],
    };
    fetchMock.once(JSON.stringify(mockCharacter));

    render(<CharacterDetails />);

    await screen.findByText("Luke Skywalker");
    await screen.findByText("Gender: male");
    await screen.findByText("Home Planet: Tatooine");
  });

  it('calls addFavourite when "Add to Favourites" button is clicked', async () => {
    const mockCharacter = { id: "1", name: "Luke Skywalker", gender: "male" };
    const addFavourite = jest.fn();
    const removeFavourite = jest.fn();

    render(
      <FavouritesContext.Provider
        value={{ favourites: [], addFavourite, removeFavourite }}
      >
        <CharacterDetails />
      </FavouritesContext.Provider>
    );

    await screen.findByText("Add to Favourites");
    fireEvent.click(screen.getByText("Add to Favourites"));
    expect(addFavourite).toHaveBeenCalledWith(mockCharacter);
  });

  it('displays "already in favourites" message when character is in favourites', async () => {
    const mockCharacter = {
      id: "1",
      name: "Luke Skywalker",
      gender: "male",
      homeworld: "Tatooine",
    };

    render(
      <FavouritesContext.Provider
        value={{
          favourites: [mockCharacter],
          addFavourite: jest.fn(),
          removeFavourite: jest.fn(),
        }}
      >
        <CharacterDetails />
      </FavouritesContext.Provider>
    );

    await screen.findByText(/already in your favourites/i);
  });

  it("displays an error message if character data fetch fails", async () => {
    fetchMock.mockReject(new Error("Failed to fetch"));

    render(<CharacterDetails />);

    await screen.findByText("No character found");
  });
});
