import FileList from "@/components/files";
import Navbar from "@/components/navbar";
import Head from "next/head";
import { useContext } from "react";
import AppContext from "./AppContext";

export default function Home() {
  const { currentDir } = useContext(AppContext);

  const currFolderName =
    currentDir.split("/")[currentDir.split("/").length - 1];

  return (
    <main>
      <Head>
        <title>{currFolderName} | FLY</title>
      </Head>
      <Navbar />
      <FileList />
    </main>
  );
}
