import ReactMarkdown from "react-markdown";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Micron(props) {
  return (
    <div className="micron-container">
      <ReactMarkdown>{props.content}</ReactMarkdown>
      <p className="date">{props.date}</p>
      <Button onClick={()=>props.onDelete(props.id)}><DeleteIcon/></Button>
      <Button onClick={()=>{
        const myNewText = prompt("Enter new text for Micron: ");
        props.onEdit(props.id,myNewText);
      }}><EditIcon /></Button>
    </div>
  );
}
