import React, { useState, useEffect } from "react";
import "./ProfilesContainer.css";
import axios from "axios";
import StudentProfile from "./StudentProfile";
import TextField from "@material-ui/core/TextField";

export default function ProfileContainer() {
  const [studentsData, setData] = useState([]);
  const [filteredStudent, setStudent] = useState([]);
  const [searchNameKayWord, setNameKey] = useState("");
  const [searchTagKayWord, settTagKey] = useState("");
  const handleSearchName = (e) => {
    setNameKey(e.target.value);
  };
  const handleSearchTag = (e) => {
    settTagKey(e.target.value);
  };

  useEffect(async () => {
    const result = await axios("https://api.hatchways.io/assessment/students");

    result.data.students.map((student) => {
      student.tags = [];
      student.expand = false;
    });

    setData(result.data.students);
    setStudent(result.data.students);
  }, []);

  useEffect(() => {
    const result = studentsData.filter((student, idx) => {
      const nameKey = searchNameKayWord.toLowerCase();
      const tagKey = searchTagKayWord.toLowerCase();

      const checkTag = (tag) => {
        return tag.includes(tagKey);
      };

      return (
        ((student.firstName + student.lastName)
          .toLowerCase()
          .includes(nameKey) ||
          (student.firstName + " " + student.lastName)
            .toLowerCase()
            .includes(nameKey)) &&
        (student.tags.some(checkTag) || tagKey === "")
      );
    });

    console.log(result);
    setStudent(result);
  }, [searchNameKayWord, searchTagKayWord]);

  function onChangeExpand(studentId) {
    let newStudentsData = [...studentsData];
    newStudentsData.map((student) => {
      if (student.id === studentId) {
        student.expand = !student.expand;
      }
    });

    setData(newStudentsData);
  }

  function onSaveTag(tag, studentId) {
    let newStudentsData = [...studentsData];
    newStudentsData.map((student) => {
      if (student.id === studentId) {
        student.tags = [...student.tags, tag];
        console.log(
          "Tag " +
            tag +
            " added on " +
            student.firstName +
            " " +
            student.lastName
        );
      }
    });
    setData(newStudentsData);
  }

  return (
    <div className="Profiles_Container">
      <form className="SearchBar" id="name-input" noValidate autoComplete="off">
        <TextField
          margin="normal"
          size="medium"
          fullWidth="true"
          id="standard-basic"
          placeholder="Search by name"
          onChange={handleSearchName}
        />
      </form>

      <form className="SearchBar" noValidate autoComplete="off">
        <TextField
          margin="normal"
          fullWidth="true"
          id="standard-basic"
          placeholder="Search by tags"
          onChange={handleSearchTag}
        />
      </form>

      {filteredStudent.map((student) => (
        <StudentProfile
          student={student}
          onSaveTag={onSaveTag}
          onChangeExpand={onChangeExpand}
        />
      ))}
    </div>
  );
}
