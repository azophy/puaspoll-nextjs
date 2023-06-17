import Navbar from '../../common/nav'
import Vote from './vote'

export default function VotePage() {
  const choices = [
    'sukarno',
    'suharto',
    'habibie',
    'SBY',
  ]		

    return (
      <div>
        <Vote 
	  title="coba coba"
	  choices={choices}
	/>
        <Navbar />
      </div>
    )
}
