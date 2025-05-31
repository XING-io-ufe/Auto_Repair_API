import "./globals.css";
import LayoutShell from "./LayoutShell";
import { UserProvider } from "../context/UserContext";

export const metadata = {
  title: "GoService | Car Service",
  description: "Авто машины засвар үйлчилгээний платформ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>
        <UserProvider >
          <LayoutShell>{children}</LayoutShell>
        </UserProvider>
      </body>
    </html>
  );
}
