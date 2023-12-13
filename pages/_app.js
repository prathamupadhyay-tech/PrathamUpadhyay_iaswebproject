import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import Navbar from "@/user/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState(0);

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    Cookies.remove("authToken");
    setkey(Math.random());
    setuser({ value: null });

    router.push(`/`);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setuser({ value: token });
    }
    setkey(Math.random());
  }, [router.query]);

  return (
    <div>
      <NextNProgress
        color="#ffa500"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />
      <Navbar></Navbar>
      {/* <NavBar logout={logout} user={user} key={key} /> */}
      <Component {...pageProps} />
    </div>
  );
}
