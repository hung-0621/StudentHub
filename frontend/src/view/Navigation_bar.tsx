import "../style/Navigation_bar.css";
import { Link } from "react-router-dom";

export default function Navigation_bar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        學生管理系統
      </Link>
      <ul>
        <li>
          <Link to="/find">查找學生</Link>
        </li>
        <li>
          <Link to="/create">新增學生</Link>
        </li>
        <li>
          <Link to="/update">更新資料</Link>
        </li>
        <li>
          <Link to="/delete">刪除學生</Link>
        </li>
      </ul>
    </nav>
  );
}
