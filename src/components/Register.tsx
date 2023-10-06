import { useState, useEffect } from "react"
import { Navigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { fireAuth } from "../FirebaseConfig"

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createUserWithEmailAndPassword(fireAuth, registerEmail, registerPassword)
    } catch (error) {
      fireAuth
      alert("正しく入力してください")
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
          <h1>新規登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button>登録する</button>
            <p>
              ログインは<Link to={`/login/`}>こちら</Link>
            </p>
          </form>
        </>
      )}
    </>
  )
}

export default Register
