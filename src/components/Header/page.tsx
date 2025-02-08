export default function Header({id}:{id?:string}) {
    if (id=="vote") {
        return <header>
            <h1>投票システム</h1>
        </header>
    }
  return <header>
    <h1>NewDimWorlds</h1>
    <h2>The Biggest Minecraft Streaming Server!</h2>
  </header>
}