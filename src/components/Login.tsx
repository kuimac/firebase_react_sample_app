import { useState } from "react";

const Login = () => {
  /* ↓state変数を定義 */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <>
      <h1>ログインページ</h1>
      <form>
        <div>
          <label>メールアドレス</label>
          {/* ↓「value」と「onChange」を追加 */}
          <input
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          {/* ↓「value」と「onChange」を追加 */}
          <input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button>ログイン</button>
      </form>
    </>
  );
};

export default Login;
