import LinkForm from "../components/LinkManagement/LinkForm";
import Link from "next/link";
import { FaChartBar, FaQrcode } from "react-icons/fa";

export default function Home() {
  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <header style={{ textAlign: "center", padding: "16px 0" }}>
        <img src="/images/logo.svg" alt="HyberLink Logo" style={{ width: 64, height: 64 }} />
        <h1 style={{ fontWeight: "bold", fontSize: 32, margin: "16px 0 0 0" }}>HyberLink</h1>
        <p style={{ color: "#555" }}>The modern, secure, analytics-powered URL shortener</p>
      </header>
      <main>
        <LinkForm />
        <div style={{ margin: "32px 0", textAlign: "center" }}>
          <Link href="/dashboard">
            <button style={{ marginRight: 12 }}>
              <FaChartBar style={{ marginRight: 6, verticalAlign: -2 }} />
              Dashboard
            </button>
          </Link>
          <Link href="/dashboard/revenue">
            <button>
              <FaQrcode style={{ marginRight: 6, verticalAlign: -2 }} />
              Analytics
            </button>
          </Link>
        </div>
      </main>
      <footer style={{ textAlign: "center", margin: "52px 0 0 0", color: "#aaa" }}>
        &copy; {new Date().getFullYear()} HyberLink. All Rights Reserved.
      </footer>
    </div>
  );
}
