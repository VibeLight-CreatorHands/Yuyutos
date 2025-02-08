import Bubble from "@/components/Bubble/page";
import Button from "@/components/Button/page";


export default function About() {
  const toggleBubble = (bubbleId: string) => {
    const bubble = document.getElementById(bubbleId);
    if (bubble) {
      bubble.classList.toggle("hide");
      bubble.classList.toggle("show");
    }
  };
  return <section id='about'>
      <h3>About Us</h3>
      <p>Welcome to NewDimWorlds, the ultimate Minecraft streaming server! Join us for thrilling adventures, epic builds, and much more.</p>
      <Button content="詳細を見る" onClick={() => toggleBubble("aboutBubble")} />
      <Bubble id="aboutBubble" className="bubble hide" content="ここでは、Minecraftサーバーの魅力を紹介します！" />
    </section>;
}
