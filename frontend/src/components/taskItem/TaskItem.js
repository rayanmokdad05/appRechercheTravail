import Card from "../UIElements/Card";

import "./TaskItem.css";
import { Link } from "react-router-dom";

const TaskItem = (props) => {
  return (
    <li className="task-item">
      <Card className="task-item__content">
        <div className="task-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="task-item__info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>

        <div className="task-item__actions">
          <Link to={`/tasks/${props.id}`}>
            <button>EDIT</button>
          </Link>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default TaskItem;
