import SignUser from "../components/SignUser"

interface Props {}

export default function Home({}: Props) {
  return (
    <div className="bg-white">
        <SignUser />
    </div>
  )
}