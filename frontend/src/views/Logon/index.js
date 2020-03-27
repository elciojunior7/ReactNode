import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom"
 import {FiLogIn} from "react-icons/fi";

import api from "../../services/api";
import "./style.css";

import imgLogo from "../../assets/logo.svg";
import imgHeroes from "../../assets/heroes.png";

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post("/sessions", { id });

            localStorage.setItem("ongName", response.data.ong.name);
            localStorage.setItem("ongId", id);

            history.push("/profile")
        } catch (error) {
            alert("Falha no Login");
        }
    }

    return (
        //class é uma palavra reservada no React, por isso, atributo classe é declarado com className
        <div className="logon-container">
            <section className="form">
                <img src={imgLogo} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={imgHeroes} alt="Heroes" />
        </div>
    )
}