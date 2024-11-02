import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "../../components/CharacterCard";

describe("CharacterCard Component", () => {
  const character = {
    id: "1",
    name: "Luke Skywalker",
    gender: "male",
    homeworld: "Tatooine",
  };

  test("renders character information correctly", () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();
    expect(screen.getByText("Home Planet: Tatooine")).toBeInTheDocument();
  });

  test("has a link to the character details page", () => {
    render(<CharacterCard character={character} />);

    const link = screen.getByRole("link", { name: /View Details/i });
    expect(link).toHaveAttribute("href", "/character/1");
  });

  test("calls onRemove when the remove button is clicked", () => {
    const mockOnRemove = jest.fn();
    render(<CharacterCard character={character} onRemove={mockOnRemove} />);

    const removeButton = screen.getByRole("button", { name: /Remove/i });
    fireEvent.click(removeButton);
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  test("does not render the remove button when onRemove is not provided", () => {
    render(<CharacterCard character={character} />);

    const removeButton = screen.queryByRole("button", { name: /Remove/i });
    expect(removeButton).not.toBeInTheDocument();
  });
});
