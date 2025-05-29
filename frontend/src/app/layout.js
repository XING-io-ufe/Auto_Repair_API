import "./globals.css";
import LayoutShell from "./LayoutShell";

export const metadata = {
  title: "GoService | Car Service",
  description: "Авто машины засвар үйлчилгээний платформ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
