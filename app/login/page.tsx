'use client';

import Head from "next/head";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Properties} from "csstype";

export default function About() {
    const router = useRouter();
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    const centerH: Properties = {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0%)',
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p className="text-center mt-10 font-medium text-gray-500">Prihlasovanie</p>
            <p className="text-center mt-24 text-xl font-bold tracking-tighter">Vitajte v appke GoldLux!</p>
            <span className="p-float-label mt-16">
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">Email</label>
            </span>

            <span className="p-float-label mt-5">
                <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask
                          promptLabel="Zadajte heslo" weakLabel="Slabé" mediumLabel="Priemerné" strongLabel="Silné"/>
                <label htmlFor="password">Heslo</label>
            </span>
            <Button style={{marginTop: "20vh"}} label="Prihlásiť sa" severity="secondary" outlined />
            <p className="mt-20 text-center underline text-gray-600">Alebo, ak ste nový užívateľ, zaregistrujte sa </p>
        </>
    )
}