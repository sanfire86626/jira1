import { useState, useEffect } from "react";
import * as qs from "qs";
import List from "./list";
import SearchPanel from "./search-panel";
import { cleanObject, useMount, useDebounce } from "utils";
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  useEffect(() => {
    console.log(qs.stringify(cleanObject(debouncedParam)));
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);
  //初始化页面列表数据
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectListScreen;
