import CreateAccount from "../components/CreateAccount"

interface Props {}

export default function Home({}: Props) {
  return (
    <div className="bg-white">
        <CreateAccount />
    </div>
  )
}