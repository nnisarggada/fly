import FileList from "@/components/files";
import Navbar from "@/components/navbar";
import Head from "next/head";
import { useContext } from "react";
import AppContext from "./AppContext";
import config from "@/public/config";

export default function Home() {
  const { currentDir } = useContext(AppContext);

  let currFolderName = "Home";

  if (currentDir == config.homeDir) {
    currFolderName = "Home";
  } else {
    currFolderName = currentDir.split("/")[currentDir.split("/").length - 1];
  }

  return (
    <main>
      <Head>
        <title>
          {currentDir != config.homeDir ? currFolderName : "Home"} | FLY
        </title>
      </Head>
      <Navbar />
      <FileList />
    </main>
  );
}
