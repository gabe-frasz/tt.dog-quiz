import { useState, useEffect } from "react";

import { PROVOCATIVE_PHRASES } from "../consts";
import { breedMapper, generateRandomOptions, getRandomKey } from "../utils";

interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
}

export function useGame() {
  const [score, setScore] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "playing" | "answered">(
    "loading",
  );
  const [dogImage, setDogImage] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [phrase, setPhrase] = useState<string>("");

  async function fetchNewRound() {
    setStatus("loading");
    setSelectedOptionId(null);

    const correctKey = getRandomKey(Object.keys(breedMapper));

    const res = await fetch(
      `https://dog.ceo/api/breed/${correctKey}/images/random`,
    );
    const data = await res.json();

    if (data.status !== "success") return;

    setDogImage(data.message);
    setOptions(generateRandomOptions(correctKey));
    setPhrase(getRandomKey(PROVOCATIVE_PHRASES));
    setStatus("playing");
  }

  useEffect(() => {
    fetchNewRound();
  }, []);

  function handleOptionPress(option: Option) {
    setSelectedOptionId(option.id);
    if (option.isCorrect) setScore((prev) => prev + 10);
    setStatus("answered");
  }

  return {
    score,
    status,
    dogImage,
    options,
    selectedOptionId,
    phrase,
    handleOptionPress,
    nextRound: fetchNewRound,
  };
}
