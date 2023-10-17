import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const user = data?.session?.user; 
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
