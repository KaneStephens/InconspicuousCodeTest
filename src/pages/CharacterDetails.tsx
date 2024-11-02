import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Spinner, Button, Stack } from "@chakra-ui/react";
import { FavouritesContext } from "../context_providers/FavouritesContext";
import { DetailedCharacter } from "../types";
import { fetchHomeworldName, fetchResources } from "../api";

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { favourites, addFavourite } = useContext(FavouritesContext)!;
  const [character, setCharacter] = useState<DetailedCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  let isFavourite = false;

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        const data = await response.json();

        const homeworldName = await fetchHomeworldName(data.homeworld);

        const filmTitles =
          data.films.length > 0
            ? await fetchResources(data.films, "title")
            : [];

        const starshipNames =
          data.starships.length > 0
            ? await fetchResources(data.starships, "name")
            : [];

        setCharacter({
          id: id!,
          name: data.name,
          gender: data.gender,
          homeworld: homeworldName,
          hairColor: data.hair_color,
          eyeColor: data.eye_color,
          films: filmTitles,
          starships: starshipNames,
          height: data.height,
        });
      } catch (error) {
        console.error("Error fetching character data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (character) {
    isFavourite = favourites.map((fav) => fav.id).includes(character.id);
  }

  if (loading) return <Spinner />;

  return character ? (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading size="lg" mb={2}>
        {character.name}
      </Heading>
      <Stack p={1}>
        <Text>
          <strong>Gender:</strong> {character.gender}
        </Text>
        <Text>
          <strong>Home Planet:</strong> {character.homeworld}
        </Text>
        <Text>
          <strong>Hair Color:</strong> {character.hairColor}
        </Text>
        <Text>
          <strong>Eye Color:</strong> {character.eyeColor}
        </Text>
      </Stack>

      <Heading size="md" mt={4}>
        Films
      </Heading>
      <Box mt={2}>
        <Stack p={1}>
          {character.films.map((film, index) => (
            <Text key={index}>{film}</Text>
          ))}
        </Stack>
      </Box>

      {character.starships.length > 0 && (
        <>
          <Heading size="md" mt={4}>
            Starships
          </Heading>
          <Box mt={2}>
            <Stack p={1}>
              {character.starships.map((starship, index) => (
                <Text key={index}>{starship}</Text>
              ))}
            </Stack>
          </Box>
        </>
      )}

      <Box mt={4}>
        {!isFavourite ? (
          <Button onClick={() => addFavourite(character)}>
            Add to Favourites
          </Button>
        ) : (
          <Text color="green.500">
            This character is already in your favourites.
          </Text>
        )}
      </Box>
    </Box>
  ) : (
    <Text>No character found</Text>
  );
};
export default CharacterDetails;
