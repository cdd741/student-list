import React from "react";
import "./StudentProfile.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Chip from "@material-ui/core/Chip";

export default function StudentProfile(props) {
  const handleSubmit = (e, studentId) => {
    if (e.key === "Enter") {
      props.onSaveTag(e.target.value, studentId);
    }
  };

  function ExpandButton(props) {
    if (props.student.expand) {
      return (
        <RemoveIcon
          fontSize="large"
          className="expand-btn"
          onClick={() => props.onChangeExpand(props.student.id)}
        >
          collaps
        </RemoveIcon>
      );
    } else {
      return (
        <AddIcon
          fontSize="large"
          className="expand-btn"
          onClick={() => props.onChangeExpand(props.student.id)}
        >
          extend
        </AddIcon>
      );
    }
  }

  function Expand(props) {
    if (props.expand) {
      return (
        <div>
          <ul>
            {props.grades.map((grade, idx) => (
              <li>
                Test{idx}: {grade}%
              </li>
            ))}
          </ul>
          <div>
            <ul className="student_tags">
              {props.tags.map((tag) => (
                <Chip className="chip-label" label={tag} />
              ))}
            </ul>
            <form className="add-tag-input" noValidate autoComplete="off">
              <TextField
                margin="normal"
                id="standard-basic"
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  handleSubmit(e, props.studentId);
                }}
              />
            </form>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="student">
      <Grid
        className="student_grid"
        container
        direction="row"
        justify="space-between"
      >
        <Grid
          className="profile_imgage_container"
          item
          xs={3}
          justify="center"
          alignItems="center"
        >
          <img className="profile_image" src={props.student.pic} alt="" />
        </Grid>
        <Grid className="student_info" item xs={6}>
          <h1>
            {(
              props.student.firstName +
              " " +
              props.student.lastName
            ).toUpperCase()}
          </h1>

          <ul>
            <li className="Student_Email">Email: {props.student.email}</li>
            <li className="Student_Company">
              Company: {props.student.company}
            </li>
            <li className="Student_Skill">Skill: {props.student.skill}</li>
            <li className="Student_Avg">
              Average:{" "}
              {props.student.grades.reduce((a, b) => Number(a) + Number(b)) /
                props.student.grades.length}
              %
            </li>
          </ul>
          <Expand
            grades={props.student.grades}
            tags={props.student.tags}
            expand={props.student.expand}
            studentId={props.student.id}
          />
        </Grid>
        <Grid className="expand_button" item xs={3}>
          <ExpandButton
            student={props.student}
            onChangeExpand={props.onChangeExpand}
          />
        </Grid>
      </Grid>
    </div>
  );
}
