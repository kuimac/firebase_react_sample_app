import { useState, useEffect, useLayoutEffect } from "react"
import { useNavigate, Navigate, Link } from "react-router-dom"
import type { User } from "@firebase/auth"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { fireAuth, firebaseApps } from "../FirebaseConfig"
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"

const MyPage = () => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  /**
   * Firebaseでログインしているかを判断する
   * ログインしている場合はuser情報をstateに格納する
   */
  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      if (!currentUser) return
      setUser(currentUser)
      setIsLogin(true)
      setIsLoading(false)
    })
  }, [])

  /**
   *  Firestore にユーザー用のドキュメントが作られていなければ作成する
   */
  useLayoutEffect(() => {
    fireAuth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return
      const usersDocRef = collection(firebaseApps.db, "users")
      await setDoc(doc(usersDocRef, currentUser.uid), {
        // name: currentUser.uid,
        display_name: "",
        created_at: serverTimestamp()
      })
    })
  }, [])

  const navigate = useNavigate()
  const logout = async () => {
    await signOut(fireAuth)
    navigate("/login/")
  }

  return (
    <>
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
  )
}

export default MyPage
