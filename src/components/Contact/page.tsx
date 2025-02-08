'use client'
import Button from "@/components/Button/page";
import Bubble from "@/components/Bubble/page";

export default function Contact() {
    function toggleBubble(bubbleId: string) {
        const bubble = document.getElementById(bubbleId);
        if (bubble) {
          bubble.classList.toggle("hide");
          bubble.classList.toggle("show");
        }
      };
    
    return (<section>
        <h3>Contact</h3>
        <p>If you have any questions, feel free to reach out to us via Discord or email.</p>
        <Button content="詳細を見る" onClick={() => toggleBubble("contactBubble")} />
        <Bubble id="contactBubble" className="bubble hide" content='お問合せはDiscordまたはメールで受け付けています！' />
    </section>);
}