import Bubble from "@/components/Bubble/page";
import Button from "@/components/Button/page";

export default function Features() {
    const toggleBubble = (bubbleId: string) => {
        const bubble = document.getElementById(bubbleId);
        if (bubble) {
          bubble.classList.toggle("hide");
          bubble.classList.toggle("show");
        }
      };
      
    return <section>
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
}