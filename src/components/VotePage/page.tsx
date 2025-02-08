'use client'
import { useState, useEffect } from 'react';
import Button from "@/components/Button/page";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

// Firebaseの設定（.envファイルに分離推奨）
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function VoteSection() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [voteCounts, setVoteCounts] = useState({ pvp: 0, pve: 0 });

  useEffect(() => {
    const loginButton = document.createElement("button");
    loginButton.textContent = "Googleでログイン";
    document.body.prepend(loginButton);

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

    return () => {
      loginButton.removeEventListener('click', () => {});
      loginButton.remove();
    };
  }, []);

  const vote = async (type: string) => {
    if (!currentUser) {
      alert("投票するにはログインしてください！");
      return;
    }

    const votesRef = ref(database, "votes");
    try {
      const snapshot = await get(votesRef);
      const data = snapshot.val() || { pvp: 0, pve: 0 };
      await update(votesRef, { [type]: data[type] + 1 });
    } catch (error) {
      console.error("投票エラー:", error);
    }
  };

  useEffect(() => {
    const votesRef = ref(database, "votes");
    const unsubscribe = onValue(votesRef, (snapshot) => {
      const data = snapshot.val() || { pvp: 0, pve: 0 };
      setVoteCounts(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section>
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
}
