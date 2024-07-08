import { useState, FormEvent, useContext } from "react";

import Head from "next/head";

import LogoImg from '../../../public/logo.svg'
import Image from "next/image";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";

import Link from "next/link";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  
  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if(name === '' || email === '' || password === '') {
      alert('Fill in the fields');
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false);
  }

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

          <form className="w-11/12 flex flex-col" onSubmit={handleSignUp}>
            <Input type="text" placeholder="Digite seu nome" value={name} onChange={ (e) => setName(e.target.value)}/>

            <Input type="text" placeholder="Digite o seu email" value={email} onChange={ (e) => setEmail(e.target.value)}/>

            <Input type="password" placeholder="Sua senha" value={password} onChange={ (e) => setPassword(e.target.value)}/>

            <Button type="submit" loading={loading}>
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