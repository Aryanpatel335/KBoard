import React, { useState, useContext, useEffect } from "react";
import { BoardContext } from "./KBoard";
import { Card } from "react-bootstrap";

//from online source
const formateDate = (date) => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var month = months[date.getMonth()];
  var day = "" + date.getDate();

  if (day.length < 2) day = "0" + day;

  return month + " " + day + ", " + date.getFullYear();
};

const initialEditedValues = {
  title: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
};

function CardItem(props) {
  const [show, setShow] = useState(false);
  const [editedValues, setFormValues] = useState(initialEditedValues);
  const handleClose = () => setShow(false);
  const { taskState, onDeletingTask, onUpdatingTask } =
    useContext(BoardContext);

  const handleShow = () => {
    setShow(true);
  };

  const clickHandler = (type) => {
    if (type === "edit") {
      var formValues = taskState.find((task) => {
        return task.id === props.task.id;
      });
      setFormValues(formValues);
      handleShow();
    } else if (type === "delete") {
      onDeletingTask(props.task.id);
    }
  };

  const handleUpdate = (values, submitProps) => {
    submitProps.setSubmitting(false);
    onUpdatingTask(values);
    setShow(false);
    submitProps.resetForm();
  };

  return (
    <>
      <Card key={props.task.id} className="card-task">
        <Card.Body>
          <Card.Title>
            {props.task.title}{" "}
            <div className="card-task-option pull-right">
              <a onClick={() => clickHandler("edit")}>
                <i className="fas fa-edit"></i>
              </a>
              &nbsp;
              <a onClick={() => clickHandler("delete")}>
                <i className="fas fa-trash"></i>
              </a>
            </div>
          </Card.Title>

          <table>
            <tbody>
              <tr>
                <td className="font-weight-bold">Start Date:</td>
                <td>{formateDate(props.task.startDate)}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Due Date:</td>
                <td className="pull-right">
                  {formateDate(props.task.endDate)}
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardItem;
