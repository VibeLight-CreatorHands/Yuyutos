export default function Footer({id}:{id?:string}) {
    if (id=="vote") {
        return <footer>© 2025 NewDimWorlds</footer>
    }
    return <footer>
    <p>© 2025 NewDimWorlds All rights reserved.</p>
  </footer>
}