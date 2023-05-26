import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { dataInterface } from "../lib/types";

const List: React.FC = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const lists: dataInterface[] = queryClient.getQueryData(["lists"]) || [];
  const currentList = lists.find((list) => list.name === params.listName);

  return (
    <div>
      <Link to={"/lists"} className="text-white">
        Retour
      </Link>
      <br></br>
      <div className="text-center text-white">{params.listName}</div>
      {currentList &&
        currentList.data &&
        Object.keys(currentList.data).map((key, index) => {
          return (
            <div>
              <div>{key}</div>
              <div>{currentList.data[key]}</div>
              <br></br>
            </div>
          );
        })}
    </div>
  );
};

export default List;
