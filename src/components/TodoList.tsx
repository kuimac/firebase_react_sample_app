import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import TodoItem from "./TodoItem";

type TodoListType = {
  id: string;
  text: string;
  timestamp: any;
};

const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<TodoListType[]>([
    { id: "", text: "", timestamp: null },
  ]);
  useEffect(() => {
    const q = query(collection(db, "todo"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, async (snapshot) => {
      setTodo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
        })),
      );
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <>
      {todo[0]?.id && (
        <>
          {todo.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </>
      )}
    </>
  );
};

export default TodoList;
