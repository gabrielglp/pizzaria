import Head from "next/head";

import LogoImg from '../../../public/logo.svg'
import Image from "next/image";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça o seu cadastro agora!</title>
      </Head>
      <div className="min-h-[100vh] flex justify-center items-center flex-col bg-grey-900">
        <Image
          src={LogoImg}
          alt="Logo"
        />

        <div className="mt-8 w-full md:w-[600px] flex items-center justify-center flex-col py-8 px-8">
          <h1 className="text-white pb-4 font-semibold text-3xl">Criando sua conta</h1>

          <form className="w-11/12 flex flex-col">
            <Input type="text" placeholder="Digite seu nome"/>

            <Input type="text" placeholder="Digite o seu email"/>

            <Input type="password" placeholder="Sua senha"/>

            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>

          <Link href="/" className="mt-4">   
            <span className="text-white cursor-pointer">Já possui uma conta? Faça o login!</span>
          </Link>
        </div>
      </div>
    </>
  );
}