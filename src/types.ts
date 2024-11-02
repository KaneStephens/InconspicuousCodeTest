export interface Character {
  id: string;
  name: string;
  gender: string;
  homeworld: string;
}

export interface CharactersResponse {
  characters: Character[];
  count: number;
}

export interface CharacterWithUrl extends Character {
  url: string;
}

export interface FavouritesContextProps {
  favourites: Character[];
  addFavourite: (character: Character) => void;
  removeFavourite: (id: string | undefined) => void;
}

export interface DetailedCharacter extends Character {
  hairColor: string;
  eyeColor: string;
  films: string[];
  starships: string[];
}

export interface CharacterCardProps {
  character: Character;
  onRemove?: () => void;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
