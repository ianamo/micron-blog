import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import '../styles.css';

export default function MicronEditor (props) {
    return (
        <div>
        <textarea name="text" cols="50" rows="4" placeholder="Type your micron..." value={props.text} onChange={e=> props.handleChange(e.target.value)}></textarea>
        <Fab style={{marginLeft: -22, marginTop: 5}} color="primary" size="small" onClick={props.onAdd}><SendIcon /></Fab>
        </div>
    )
}