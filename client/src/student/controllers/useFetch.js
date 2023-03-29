import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(setIsLoading(false))
      .catch((err) => console.log(err));
  }, [url]);
  return [data, isloading];
};
export default useFetch;
