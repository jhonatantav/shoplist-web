import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiResponse, ShoppingItem } from "../../types";
import styles from "./ShoppingList.module.css";

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get<ShoppingItem[]>(
        "http://localhost:4000/shopping-list",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:4000/shopping-list",
        { name, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setItems([...items, response.data.data]);
      setName("");
      setQuantity(1);
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping List</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>
      <button className={styles.button} onClick={handleAddItem}>
        Add Item
      </button>
      <ul className={styles.list}>
        {items.map((item) => (
          <li className={styles.listItem} key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
