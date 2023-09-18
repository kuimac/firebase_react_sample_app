/* 「useState」と「useEffect」をimport↓ */
import { useState, useEffect } from "react";
import type { User } from "@firebase/auth";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      setUser(currentUser);
    });
  }, []);

  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  return (
    <>
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user?.email}</p>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default MyPage;
