import { asyncGet, asyncPost } from "../utils/fetch";
import Navigation_bar from "./Navigation_bar";
import { api } from "../enum/api";
import { useState } from "react";
import "../style/form.css";
import "../style/App.css"

export default function Create() {
    const [newStudent, setNewStudent] = useState({
        _id: "",
        userName: "",
        sid: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        Email: "",
        absences: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setNewStudent((prev) => ({
            ...prev,
            [name]: name === "absences" ? Number(value) | 0 : value, // 將 absences 轉為數字
        }));
    }

    async function handle_OnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSuccess(null);
        setError(null);

        const userNamePattern = /^tku[a-z]{2,}[0-9]{4}$/; // tku + 2字母縮寫 + 4位數座號
        if (!userNamePattern.test(newStudent.userName)) {
            setError(`學生帳號格式不正確 ex:tkuim0000`);
            return;
        }

        try {
            const response = await asyncPost(api.insertOne, newStudent);
            if (response.code === 200) {
                setSuccess("新增成功");

                // 最新學生列表
                const updatedList = await asyncGet(api.findAll);
                if (updatedList.code === 200) {
                    setNewStudent(updatedList.body[updatedList.body.length - 1]);
                    console.log(JSON.stringify(newStudent));
                } else {
                    console.error("更新學生列表失敗:", updatedList.message);
                }

            } else {
                setError("新增失敗");
            }
        } catch (error) {
            setError("伺服器錯誤，請稍後再試");
            console.error("Create error:", error);
        }
    }

    return (
        <>
            <Navigation_bar />
            <div className="form">
                <form onSubmit={handle_OnSubmit}>
                    <h2 className="title">新增學生</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <input
                        type="text"
                        name="userName"
                        value={newStudent.userName}
                        onChange={handle_OnChange}
                        placeholder="帳號 (ex:tkuim0000)"
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
                        type="text"
                        name="absences"
                        value={newStudent.absences}
                        onChange={handle_OnChange}
                        placeholder="缺席次數"
                    />
                    <br />
                    <button type="submit">新增</button>
                </form>
                {/* 顯示學生列表 */}
                {success && <div className="container" key={newStudent._id}>
                    <h2>成功新增學生！</h2>
                    <br />
                    <div className="student" key={newStudent._id}>
                        <p>帳號: {newStudent.userName}</p>
                        <p>座號: {newStudent.sid}</p>
                        <p>姓名: {newStudent.name}</p>
                        <p>院系: {newStudent.department}</p>
                        <p>年級: {newStudent.grade}</p>
                        <p>班級: {newStudent.class}</p>
                        <p>Email: {newStudent.Email}</p>
                        <p>缺席次數: {newStudent.absences ? newStudent.absences : 0}</p>
                    </div>
                </div>
                }
            </div>
        </>
    );
}
