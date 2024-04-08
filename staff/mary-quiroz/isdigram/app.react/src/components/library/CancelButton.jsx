import RoundButton from './RoundButton'

import './CancelButton.sass'

function CancelButton(props) {
    return <RoundButton className ="cancel-button" onclick={props.onclick}>{props.children || 'Cancel'}</RoundButton>
}

export default CancelButton