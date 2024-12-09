import { asyncDelete } from "../utils/fetch";
import Navigation_bar from "./Navigation_bar";
import { useState } from "react";
import { api } from "../enum/api";

export default function Delete() {
    const [data, setData] = useState({
        userName: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function handle_OnSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!data.userName) {
            setError("請輸入座號！");
            return;
        }

        try {
            const response = await asyncDelete(api.deleteBySid, { sid: data.userName });

            // 假設 API 回傳成功訊息，根據後端邏輯可做調整
            if (response && response.success) {
                setSuccess("學生刪除成功！");
                setData({ userName: "" });
                setError("");
            } else {
                setError("刪除失敗，請重試。");
                setSuccess("");
            }
        } catch (error) {
            setError("刪除過程中發生錯誤！");
            setSuccess("");
        }
    }

    return (
        <>
            <Navigation_bar />
            <h2>刪除學生</h2>
            <div className="delete">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <form onSubmit={handle_OnSubmit}>
                    <input 
                        type="text" 
                        name="userName" 
                        value={data.userName} 
                        onChange={handle_OnChange} 
                        placeholder="座號" 
                    />
                    <button type="submit">刪除</button>
                </form>
            </div>
        </>
    );
}
