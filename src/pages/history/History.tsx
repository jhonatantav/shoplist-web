import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingList } from "../../types";
import styles from "./History.module.css";

const History: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get<ShoppingList[]>(
        "http://localhost:4000/shopping-list/history",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping List History</h1>
      <ul className={styles.list}>
        {lists.map((list) => (
          <li className={styles.listItem} key={list.id}>
            <span className={styles.date}>
              {new Date(list.date).toLocaleDateString()}
            </span>
            <span className={styles.items}>
              {list.items.map((item) => (
                <div key={item.id}>
                  {item.name} - {item.quantity}
                </div>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
