import Navbar from '../../components/nav'
import Poll from '../../components/poll'

export default function Page() {
  const choices = [
    'sukarno',
    'suharto',
    'habibie',
    'SBY',
  ]		

    return (
      <div>
        <Poll 
	  title="coba coba"
	  choices={choices}
	/>
        <Navbar />
      </div>
    )
}
