import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./views/Logon";
import Register from "./views/Register";
import Profile from "./views/Profile";
import NewIncident from "./views/NewIncident";

export default function Routes(){
    return(
        //BrowserRouter é obrigatório. Switch evita que, por engano, seja chamada mais de uma rota caso tenha nomes iguais
        //exact força a ser exatamente a / para entrar na rota Logon, senão qualquer rota iniciada por / apontaria para componente Logon
        <BrowserRouter>
            <Switch> 
                <Route path="/" exact component={Logon} /> 
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}