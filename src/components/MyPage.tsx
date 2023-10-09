import { useState, useEffect, useLayoutEffect } from "react"
import { useNavigate, Navigate, Link } from "react-router-dom"
import type { User } from "@firebase/auth"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { fireAuth, firebaseApps } from "../FirebaseConfig"
import { collection, doc, setDoc, serverTimestamp, getDoc, DocumentData } from "firebase/firestore"

export type userType = {
  display_name: string
  created_at: Date
}

const MyPage = () => {
  const [authUserData, setAuthUserData] = useState<User>()
  const [userData, setUserData] = useState<DocumentData>()
  const [isLoading, setIsLoading] = useState(true)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  /**
   * Firebaseでログインしているかを判断する
   * ログインしている場合はauthUser情報をstateに格納する
   */
  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      if (!currentUser) return
      // TODO: currentUser.uid まで格納されていてセキュリティ的によろしくないので使用するものだけ格納する
      setAuthUserData(currentUser)
      setIsLogin(true)
      setIsLoading(false)
    })
  }, [])

  /**
   *  Firestore にユーザー用のドキュメントが作られていなければ作成する
   *  存在する場合はstateにuserデータを入れる
   */
  useLayoutEffect(() => {
    fireAuth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return
      const usersDocRef = collection(firebaseApps.db, "users")
      const userDocumentRef = doc(firebaseApps.db, "users", currentUser.uid)

      if (!userDocumentRef) {
        await setDoc(doc(usersDocRef, currentUser.uid), {
          // name: currentUser.uid,
          display_name: "aa",
          created_at: serverTimestamp()
        })
      } else {
        getDoc(userDocumentRef).then((documentSnapshot) => {
          if (!documentSnapshot) return
          setUserData(documentSnapshot.data())
        })
      }
    })
  }, [])

  const navigate = useNavigate()
  const logout = async () => {
    await signOut(fireAuth)
    navigate("/login/")
  }
  const dateText = `${userData?.created_at.toDate().getFullYear()}年${
    userData?.created_at.toDate().getMonth() + 1
  }月${userData?.created_at.toDate().getDate()}日`

  return (
    <>
      {!isLoading ? (
        <>
          {!isLogin ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <>
                <h1>マイページ</h1>
                <p>{authUserData?.email}</p>
                <button onClick={logout}>ログアウト</button>
              </>
              <>
                <p>{userData?.display_name}</p>
                <p>{`作成日 ${dateText}`}</p>
              </>
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
