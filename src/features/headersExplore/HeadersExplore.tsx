import { Groups } from "./Groups"

export const HeadersExplore = () => {
  return <header className="h-16">
    <nav className="h-full bg-[#080810] shadow-lg flex items-center justify-between px-5">
        <Groups />
    </nav>
  </header>
}