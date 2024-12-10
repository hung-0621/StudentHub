import { useEffect, useRef, useState } from "react";
import "../style/App.css";
import { asyncGet } from "../utils/fetch";
import { api } from "../enum/api";
import { Student } from "../interface/Student";
import { resp } from "../interface/resp";
import Navigation_bar from "./Navigation_bar";

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);

  const cache = useRef<boolean>(false);

  useEffect(() => {
    /**
     * 做緩存處理, 避免多次發起請求
     */
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code == 200) {
          setStudents(res.body);
        }
      });
    }
  }, []);

  const studentList = students
    ? students.map((student: Student) => {
      return (
        <div className="student" key={student._id}>
          <p>帳號: {student.userName}</p>
          <p>座號: {student.sid}</p>
          <p>姓名: {student.name}</p>
          <p>院系: {student.department}</p>
          <p>年級: {student.grade}</p>
          <p>班級: {student.class}</p>
          <p>Email: {student.Email}</p>
          <p>缺席次數: {student.absences ? student.absences : 0}</p>
        </div>
      );
    })
    : "loading";

  return (
    <>
      {/* <div className="aggregation">{department_student_list}</div> */}
      <Navigation_bar />
      <div className="container">
        <h2 className="title">所有學生</h2>
        {studentList}
      </div>
    </>
  );
}

export default App;
