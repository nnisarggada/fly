import FileList from "@/components/files";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>FLY | Files Lovingly Yours</title>
      </Head>
      <Navbar />
      <FileList />
    </main>
  );
}
