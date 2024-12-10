import { asyncDelete, asyncGet } from "../utils/fetch";
import Navigation_bar from "./Navigation_bar";
import { Student } from "../interface/Student";
import { resp } from "../interface/resp";
import { useState } from "react";
import { api } from "../enum/api";
import "../style/form.css";

export default function Delete() {
    const [StudentNumber, setStudentNumber] = useState(0);
    asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
            setStudentNumber(res.body.length);
        }
    });

    const [sid, setSid] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSid(e.target.value);
    }

    async function handle_OnSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!sid) {
            setError("請輸入座號！");
            return;
        } else if (Number(sid) > StudentNumber || Number(sid) <= 0) {
            setError("座號輸入錯誤！")
            return;
        }

        try {
            const response = await asyncDelete(api.deleteBySid, { "sid": sid });
            if (response.message === "success") {
                setSuccess(`學生座號${sid}刪除成功！`);
                setSid("");
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
            <div className="form">
                <form onSubmit={handle_OnSubmit}>
                    <h2 className="title">刪除學生</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <input
                        type="text"
                        name="sid"
                        value={sid}
                        onChange={handle_OnChange}
                        placeholder="座號"
                    />
                    <br />
                    <button type="submit">刪除</button>
                </form>
            </div>
        </>
    );
}
