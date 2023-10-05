/* 「useState」と「useEffect」をimport↓ */
import { useState, useEffect } from "react";
import type { User } from "@firebase/auth";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate, Navigate, Link } from "react-router-dom";

const MyPage = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  /**
   * Firebaseでログインしているかを判断する
   * ログインしている場合はuser情報をstateに格納する
   */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      setUser(currentUser);
      setIsLogin(true);
      setIsLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  return (
    <>
      {isLoading ? (
        <>
          <p>
            新規登録は<Link to={`/register/`}>こちら</Link>
          </p>
          <p>
            ログインは<Link to={`/login/`}>こちら</Link>
          </p>
        </>
      ) : (
        <>
          {!isLogin ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              <p>{user?.email}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      )}

      {!isLoading ? (
        <>
          {!isLogin ? (
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
