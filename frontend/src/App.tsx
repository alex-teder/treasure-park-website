import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const BASE_URL = import.meta.env.DEV ? "http://localhost:8080/api/" : "/api/";

    fetch(BASE_URL + "ping")
      .then((res) => res.text())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>Ping: {data}</h1>
    </>
  );
}

export default App;
