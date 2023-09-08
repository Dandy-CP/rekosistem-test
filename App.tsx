import AuthProvider from "@/config/authContex";
import Root from "@/Root";

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
