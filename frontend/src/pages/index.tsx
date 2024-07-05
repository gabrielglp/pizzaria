import { useContext, FormEvent, useState } from "react";

import Head from "next/head";

import LogoImg from '../../public/logo.svg'
import Image from "next/image";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import Link from "next/link";

import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      email,
      password
    }

    await signIn(data)
  }

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
          <form className="w-11/12 flex flex-col" onSubmit={handleLogin}>
            <Input type="text" placeholder="Digite o seu email" value={email} onChange={ (e) => setEmail(e.target.value)}/>

            <Input type="password" placeholder="Sua senha" value={password} onChange={ (e) => setPassword(e.target.value)}/>

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" className="mt-4">   
            <span className="text-white cursor-pointer">Não possui uma conta? Cadastre-se</span>
          </Link>
        </div>
      </div>
    </>
  );
}
