import { useEffect, useState } from "react";

const useWordList = () => {
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    fetch("/words.json")
      .then((response) => response.json())
      .then((data) => setWordList(data.words))
      .catch((error) => console.error("Error loading words:", error));
  }, []);

  return wordList;
};

export default useWordList;
