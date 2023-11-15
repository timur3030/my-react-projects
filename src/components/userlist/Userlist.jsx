import React, { useEffect, useState } from "react";
import { Success } from "./Success";
import { Users } from "./Users";
import "./userlist.scss";

// Тут список пользователей: https://reqres.in/api/users

function Userlist() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [succses, setSuccses] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользоавателей");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const oClickSetInvites = () => {
    setSuccses(true);
  };

  return (
    <div className="App">
      {succses ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          oClickSetInvites={oClickSetInvites}
        />
      )}
    </div>
  );
}

export default Userlist;
