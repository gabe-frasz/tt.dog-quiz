import { breedMapper } from "./breed-mapper";
import { getRandomKey } from "./get-random-key";

export function generateRandomOptions(correctKey: string) {
  const keys = Object.keys(breedMapper);
  const options: string[] = [correctKey];

  while (options.length < 4) {
    const randomKey = getRandomKey(keys);
    if (options.includes(randomKey)) continue;

    options.push(randomKey);
  }

  return options
    .map((key) => ({
      id: key,
      label: breedMapper[key],
      isCorrect: key === correctKey,
    }));
}
