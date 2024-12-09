import { asyncGet, asyncPost } from "../utils/fetch";
import Navigation_bar from "./Navigation_bar";
import { api } from "../enum/api";
import { useState } from "react";

export default function Create() {
    const [newStudent, setNewStudent] = useState({
        userName: "", // 格式應為 tku + 科系縮寫 + 四碼座號
        name: "",
        department: "",
        grade: "",
        class: "",
        Email: "",
        absences: 0, // 預設為 0
    });
    const [studentsList, setStudentsList] = useState([]); // 用於存儲學生清單
    const [error, setError] = useState<string | null>(null);

    function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNewStudent((prev) => ({
            ...prev,
            [name]: name === "absences" ? Number(value) : value, // 將 absences 轉為數字
        }));
    }

    async function handle_OnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null); // 清除之前的錯誤信息

        // 確保 userName 格式符合後端要求
        const userNamePattern = /^tku[a-z]{2,}[0-9]{4}$/; // tku + 2字母縮寫 + 4位數座號
        if (!userNamePattern.test(newStudent.userName)) {
            setError("學生名字格式不正確 ex:tkubm1760");
            return;
        }

        try {
            const response = await asyncPost(api.insertOne, newStudent);
            if (response.code === 200) {
                alert("新增成功");
                setNewStudent({
                    userName: "",
                    name: "",
                    department: "",
                    grade: "",
                    class: "",
                    Email: "",
                    absences: 0,
                });

                // 拉取最新學生列表
                const updatedList = await asyncGet(api.findAll);
                if (updatedList.code === 200) {
                    setStudentsList(updatedList.body); // 更新學生清單
                } else {
                    console.error("更新學生列表失敗:", updatedList.message);
                }
            } else {
                setError(response.message || "新增失敗");
            }
        } catch (error) {
            setError("伺服器錯誤，請稍後再試");
            console.error("Create error:", error);
        }
    }

    return (
        <>
            <Navigation_bar />
            <div>
                <h2>新增學生</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handle_OnSubmit}>
                    <input
                        type="text"
                        name="userName"
                        value={newStudent.userName}
                        onChange={handle_OnChange}
                        placeholder="帳號 (Ex:tkuim0000)"
                    />
                    <br />
                    <input
                        type="text"
                        name="name"
                        value={newStudent.name}
                        onChange={handle_OnChange}
                        placeholder="姓名"
                    />
                    <br />
                    <input
                        type="text"
                        name="department"
                        value={newStudent.department}
                        onChange={handle_OnChange}
                        placeholder="院系"
                    />
                    <br />
                    <input
                        type="text"
                        name="grade"
                        value={newStudent.grade}
                        onChange={handle_OnChange}
                        placeholder="年級"
                    />
                    <br />
                    <input
                        type="text"
                        name="class"
                        value={newStudent.class}
                        onChange={handle_OnChange}
                        placeholder="班級"
                    />
                    <br />
                    <input
                        type="email"
                        name="Email"
                        value={newStudent.Email}
                        onChange={handle_OnChange}
                        placeholder="Email"
                    />
                    <br />
                    <input
                        type="number"
                        name="absences"
                        value={newStudent.absences}
                        onChange={handle_OnChange}
                        placeholder="缺席次數 (預設為 0)"
                    />
                    <br />
                    <button type="submit">新增</button>
                </form>

                {/* 顯示學生列表 */}
                <div>
                    <h3>目前學生清單</h3>
                    <ul>
                        {studentsList.map((student: any, index: number) => (
                            <li key={index}>
                                {student.userName} - {student.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
