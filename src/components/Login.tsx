import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { fireAuth } from "../FirebaseConfig"
import { Navigate, Link } from "react-router-dom"

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(fireAuth, loginEmail, loginPassword)
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています")
    }
  }

  /**
   * Firebaseでログインしているかを判断する
   */
  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      if (!currentUser) return
      setIsLogin(true)
    })
  }, [])

  return (
    <>
      {isLogin ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>ログインページ</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input name="email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button>ログイン</button>
            <p>
              新規登録は<Link to={`/register/`}>こちら</Link>
            </p>
          </form>
        </>
      )}
    </>
  )
}

export default Login
