import { useState } from "react";
import Navigation_bar from "./Navigation_bar";
import { asyncPut } from "../utils/fetch";
import { api } from "../enum/api";
import "../style/form.css";

export default function Update() {
    const [data, setData] = useState({
        userName: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        Email: "",
        absences: "",
    });
    const [error, setError] = useState<string | null>(null); // 錯誤訊息
    const [success, setSuccess] = useState<string | null>(null); // 成功訊息

    function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: name === "absences" ? Number(value)| 0 : value, // 將 absences 轉為數字
        }));
    }

    async function handle_OnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // 檢查表單是否有空值
        for (const [key, value] of Object.entries(data)) {
            if (key && value === "" || value === null) { 
                // 允許 absences 為 0
                setError("填寫欄位不得為空");
                return;
            }
        }
        

        // 檢查帳號格式
        const userNamePattern = /^tku[a-z]{2,}[0-9]{4}$/; // tku + 2字母縮寫 + 4位數座號
        if (!userNamePattern.test(data.userName)) {
            setError(`學生帳號格式不正確 ex:tkuim0000`);
            return;
        }

        // 檢查年級輸入是否為正整數
        const studentGrade = Number(data.grade);

        if (isNaN(studentGrade)) {
            setError("請輸入數字");
            return;
        } else if (studentGrade < 1) {
            setError("請輸入正整數");
            return;
        }

        try {
            const response = await asyncPut(api.update_Student_By_UserName, data);
            if (response.code === 200) {
                setSuccess("學生資料更新成功！");
                setData({
                    userName: "",
                    name: "",
                    department: "",
                    grade: "",
                    class: "",
                    Email: "",
                    absences: "",
                }); // 重置
            } else {
                setError("更新失敗，請稍後再試！");
            }
        } catch (error) {
            setError("伺服器錯誤，請稍後再試！");
        }
    }

    return (
        <>
            <Navigation_bar />
            <div className="form">
                <form onSubmit={handle_OnSubmit} className="update">
                    <h2 className="title">更新學生資料</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <label htmlFor="userName">要更新的學生帳號</label>
                    <input
                        type="text"
                        name="userName"
                        value={data.userName}
                        onChange={handle_OnChange}
                        placeholder="帳號(ex:tkuim0000)"
                    />
                    <br />
                    <label htmlFor="userName">要更新的資訊</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handle_OnChange}
                        placeholder="姓名"
                    />
                    <br />
                    <input
                        type="text"
                        name="department"
                        value={data.department}
                        onChange={handle_OnChange}
                        placeholder="院系"
                    />
                    <br />
                    <input
                        type="text"
                        name="grade"
                        value={data.grade}
                        onChange={handle_OnChange}
                        placeholder="年級"
                    />
                    <br />
                    <input
                        type="text"
                        name="class"
                        value={data.class}
                        onChange={handle_OnChange}
                        placeholder="班級"
                    />
                    <br />
                    <input
                        type="text"
                        name="Email"
                        value={data.Email}
                        onChange={handle_OnChange}
                        placeholder="Email"
                    />
                    <br />
                    <input
                        type="text"
                        name="absences"
                        value={data.absences}
                        onChange={handle_OnChange}
                        placeholder="缺席次數"
                    />
                    <br />
                    <button type="submit" value="Submit">
                        更新
                    </button>
                </form>
            </div>
        </>
    );
}
