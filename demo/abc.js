import useFetch from "../src/hook/useFetch.js";
const a = async () => {
  const data = await useFetch.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  console.log(data);
};
a();
