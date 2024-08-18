import { useState } from "react";
import ReviewList from "./components/ReviewList";
import { getReviews } from "../api";

export default function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelte = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async () => {
    const { reviews } = await getReviews();
    setItems(reviews);
  };

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelte} />
      <button onClick={handleLoadClick}>불러오기</button>
    </div>
  );
}
