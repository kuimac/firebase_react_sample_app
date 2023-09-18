/* 「useState」と「useEffect」をimport↓ */
import { useState, useEffect } from "react";
import type { User } from "@firebase/auth";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase.js";

const Mypage = () => {
  /* ↓state変数「user」を定義 */
  const [user, setUser] = useState<User>();

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user?.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Mypage;
