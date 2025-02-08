'use client'
import { useState, useEffect } from 'react';
import Bubble from "../Bubble/page";
import Button from "@/components/Button/page";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

// ✅ Firebaseの設定（本番環境では.envに分離することを推奨）
const firebaseConfig = {
  apiKey: "AIzaSyDjDdn34bhqO4ovOf4qOl3myjMscOyoAFA",
  authDomain: "ndw-backends.firebaseapp.com",
  databaseURL: "https://ndw-backends-default-rtdb.firebaseio.com",
  projectId: "ndw-backends",
  storageBucket: "ndw-backends.firebasestorage.app",
  messagingSenderId: "902040083621",
  appId: "1:902040083621:web:8549414f6f406d4ee5c14c",
  measurementId: "G-6QTLFNHJ8X"
};

// ✅ Firebaseの初期化 (一度だけ行う)
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export default function Section({id}:{id:string}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [voteCounts, setVoteCounts] = useState({ pvp: 0, pve: 0 });

  if (id == "votepage") {
  // ✅ ユーザー認証（Googleログイン） - useEffectでマウント時に一度だけ実行
  useEffect(() => {
    const loginButton = document.createElement("button");
    loginButton.textContent = "Googleでログイン";
    document.body.prepend(loginButton); // or a more specific container

    loginButton.addEventListener("click", () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          setCurrentUser(result.user);
          loginButton.textContent = `ログイン中: ${result.user.displayName}`;
          loginButton.disabled = true;
        })
        .catch((error) => {
          console.error("ログインエラー:", error);
        });
    });

    // クリーンアップ関数 (重要！メモリリークを防ぐ)
    return () => {
      loginButton.removeEventListener('click', () => {}); // Listenerの削除
      loginButton.remove();                              // buttonの削除
    };

  }, []); // 空の依存配列でマウント時のみ実行
  }

  // ✅ 投票処理（PvP/PvE）
  const vote = async (type: string) => {
    if (!currentUser) {
      alert("投票するにはログインしてください！");
      return;
    }

    const votesRef = ref(database, "votes");
    try {
      const snapshot = await get(votesRef);
      const data = snapshot.val() || { pvp: 0, pve: 0 };
      await update(votesRef, { [type]: data[type] + 1 }); // ダイナミックキーで更新
    } catch (error) {
      console.error("投票エラー:", error);
    }
  };

  // ✅ 投票結果のリアルタイム更新 - useEffectで管理
  useEffect(() => {
    const votesRef = ref(database, "votes");
    const unsubscribe = onValue(votesRef, (snapshot) => {  // unsubscribe関数を保持
      const data = snapshot.val() || {pvp: 0, pve: 0}; // デフォルト値を提供
      setVoteCounts(data); // stateを更新
    });

    // コンポーネントアンマウント時のクリーンアップ（必須！）
    return () => unsubscribe();
  }, []); // 空の依存配列でマウント時とアンマウント時に実行

  const toggleBubble = (bubbleId: string) => {
    const bubble = document.getElementById(bubbleId);
    if (bubble) {
      bubble.classList.toggle("hide");
      bubble.classList.toggle("show");
    }
  };

  switch (id) {
    case "about":
      return <section id='about'>
      <h3>About Us</h3>
      <p>Welcome to NewDimWorlds, the ultimate Minecraft streaming server! Join us for thrilling adventures, epic builds, and much more.</p>
      <Button content="詳細を見る" onClick={() => toggleBubble("aboutBubble")} />
      <Bubble id="aboutBubble" className="bubble hide" content="ここでは、Minecraftサーバーの魅力を紹介します！" />
    </section>;
    case "features":
      return <section id="features">
      <h3>Features</h3>
      <ul>
          <li>Custom Minecraft Worlds</li>
          <li>Real-time PvP & PvE battles</li>
          <li>Interactive Twitch/YouTube Integration</li>
          <li>Community-driven events</li>
      </ul>
      <Button content="詳細を見る" onClick={() => toggleBubble("featuresBubble")} />
      <Bubble id="featuresBubble" className="bubble hide" content='サーバーには、カスタムワールド、PvP＆PvEバトル、視聴者参加型機能が含まれています！' />
  </section>;
  case "contact":
    return <section id="contact">
    <h3>Contact</h3>
    <p>If you have any questions, feel free to reach out to us via Discord or email.</p>
    <Button content="詳細を見る" onClick={() => toggleBubble("contactBubble")} />
    <Bubble id="contactBubble" className="bubble hide" content='お問合せはDiscordまたはメールで受け付けています！' />
</section>;
case "vote":
  return <section id="vote">
  <h3>投票はこちら</h3>
  <p>好きなサーバーの種類を選んで投票しよう！</p>
  <a href="vote">投票ページへ</a>
</section>;
case "votepage":
  return (
    <section id="votepage">
      <h3>好きなサーバーの種類を選んで投票しよう！</h3>
      <Button content="PvEサーバー" onClick={() => vote("pve")} />
      <Button content="PvPサーバー" onClick={() => vote("pvp")} />
      <p>現在の投票結果：</p>
      <div id="result">
          <p>PvPサーバー: <span id="pvp-result">{voteCounts.pvp}</span>票</p>
          <p>PVEサーバー: <span id="pve-result">{voteCounts.pve}</span>票</p>
      </div>
    </section>
  );
      default:
        return <section id="null">
        <h3>Null Section Id</h3>
        <p>Null Section Id.</p>
      </section>;
  }
}
