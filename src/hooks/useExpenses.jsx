import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchExpenses = async () => {
  const token = localStorage.getItem("token");
  console.log("Sending request");
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/expense/viewExpenses?limit=3`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error loading Expenses: ", err);
    return {totalAmount: 0, expenses: []}
  }
};

export const useExpenses = () => {
  return useQuery({
    queryKey: [`expenses-${localStorage.getItem("token")}`], // Unique key for caching
    queryFn: fetchExpenses,
    staleTime: 5 * 60 * 1000, // data considered fresh for 5 mins
    refetchOnWindowFocus: false, // optional: avoid auto refetching
  });
};