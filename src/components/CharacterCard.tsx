import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CharacterCardProps } from "../types";

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onRemove,
}) => {
  return (
    <Box
      key={character.id}
      data-testid="character-card"
      maxW="20em"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      p={4}
    >
      <Heading size="md" mb={2}>
        {character.name}
      </Heading>
      <Text>Gender: {character.gender}</Text>
      <Text>Home Planet: {character.homeworld}</Text>
      {onRemove && <Text>Height: {character.height}cm</Text>}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Link
          to={`/character/${character.id}`}
          style={{
            display: "inline-block",
            padding: "8px 16px",
            backgroundColor: "#47dd77",
            color: "white",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          View Details
        </Link>
        {onRemove && (
          <button
            onClick={onRemove}
            style={{
              padding: "8px 16px",
              backgroundColor: "#d9534f",
              color: "white",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            Remove
          </button>
        )}
      </div>
    </Box>
  );
};

export default CharacterCard;
