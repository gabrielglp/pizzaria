import Head from "next/head";

import LogoImg from '../../public/logo.svg'
import Image from "next/image";
import { Input } from "../components/ui/input";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className="">
        <Image
          src={LogoImg}
          alt="Logo"
        />

        <div className="">
          <h1 className="text-white">teste</h1>
          <form action="">
            <Input type="text" placeholder="Digite o seu email"/>
            <Input type="password" placeholder="Sua senha"/>
          </form>
        </div>
      </div>
    </>
  );
}
