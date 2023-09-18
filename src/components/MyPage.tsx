/* 「useState」と「useEffect」をimport↓ */
import { useState, useEffect } from "react";
import type { User } from "@firebase/auth";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import { useNavigate, Navigate, Link } from "react-router-dom";

const MyPage = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  return (
    <>
      {/* ↓「loading」がfalseのときにマイページを表示する設定 */}
      {!loading ? (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              <p>{user?.email}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      ) : (
        <>
          <p>
            新規登録は<Link to={`/register/`}>こちら</Link>
          </p>
          <p>
            ログインは<Link to={`/login/`}>こちら</Link>
          </p>
        </>
      )}
    </>
  );
};

export default MyPage;
