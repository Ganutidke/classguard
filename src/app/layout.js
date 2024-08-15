import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ClassGaurd - The Attendence tracker",
  description: " Welcome to ClassGuard ClassGuard is your ultimate tool for managing student attendance. Easily upload your Excel sheets to generate defaulter lists and ensure your students meet their attendance requirements. Whether you are an educator or an administrator, our tool streamlines the process of tracking and improving student attendance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
