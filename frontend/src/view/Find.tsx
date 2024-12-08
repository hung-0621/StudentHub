import { useRef, useEffect, useState } from "react";
import Navigation_bar from "./Navigation_bar";
import { Student } from "../interface/Student";
import { resp } from "../interface/resp";
import { asyncGet } from "../utils/fetch";
import { api } from "../enum/api";


export default function Find() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [searchName, setSearchName] = useState<string>(""); // 輸入的學生姓名
  const [filteredStudents, setFilteredStudents] = useState<Array<Student>>([]); // 查詢結果

  const cache = useRef<boolean>(false);

  useEffect(() => {
    /**
     * 做緩存處理, 避免多次發起請求
     */
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
          setStudents(res.body);
          setFilteredStudents(res.body); // 預設顯示所有學生
        }
      });
    }
  }, []);

  // 當 searchName 改變時過濾學生資料
  useEffect(() => {
    if (searchName.trim() === "") {
      setFilteredStudents(students); // 沒有輸入則顯示全部學生
    } else {
      const filtered = students.filter(student =>
        student.name.includes(searchName)
      );
      setFilteredStudents(filtered);
    }
  }, [searchName, students]);


  const container = <div className="container">
    {filteredStudents.length > 0 ? (
      filteredStudents.map((student) => (
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
      ))
    ) : (
      <p>找不到符合的學生</p>
    )}


  </div>
  return (
    <div>
      <Navigation_bar />
      <input
        type="text"
        placeholder="輸入學生姓名"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)} // 更新搜尋條件
      />
      {container}
    </div>
  );
}