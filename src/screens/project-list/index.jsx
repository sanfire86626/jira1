import { useState, useEffect } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectListScreen;
