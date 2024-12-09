import { useState } from "react";
import Navigation_bar from "./Navigation_bar";
import { asyncPut } from "../utils/fetch";
import { api } from "../enum/api";

export default function Update() {
    const [data, setData] = useState({
        name: "",
        absences: "",
    });
    const [error, setError] = useState<string | null>(null); // 用於顯示錯誤訊息
    const [success, setSuccess] = useState<string | null>(null); // 用於顯示成功訊息

    function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function handle_OnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // 驗證輸入
        if (!data.name || !data.absences) {
            setError("姓名和缺席次數不能為空！");
            return;
        }

        try {
            const response = await asyncPut(api.updateAbsencesByName, data);
            if (response.code === 200) {
                setSuccess("學生資料更新成功！");
                setData({ name: "", absences: "" }); // 重置輸入欄位
            } else {
                setError(response.message || "更新失敗，請稍後再試！");
            }
        } catch (error) {
            setError("伺服器錯誤，請稍後再試！");
            console.error("Update error:", error);
        }
    }

    return (
        <>
            <Navigation_bar />
            <form onSubmit={handle_OnSubmit} className="update">
                <h2>更新學生資料</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handle_OnChange}
                    placeholder="姓名"
                />
                <br />
                <input
                    type="number"
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
        </>
    );
}
