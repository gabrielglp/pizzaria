import Head from "next/head";

import LogoImg from '../../public/logo.svg'
import Image from "next/image";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className="min-h-[100vh] flex justify-center items-center flex-col bg-grey-900">
        <Image
          src={LogoImg}
          alt="Logo"
        />

        <div className="mt-8 w-full md:w-[600px] flex items-center justify-center flex-col py-8 px-8">
          <form className="w-11/12 flex flex-col">
            <Input type="text" placeholder="Digite o seu email"/>

            <Input type="password" placeholder="Sua senha"/>

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link className="mt-4" href="/singup">   
            <span className="text-white cursor-pointer">Não possui uma conta? Cadastre-se</span>
          </Link>
        </div>
      </div>
    </>
  );
}
