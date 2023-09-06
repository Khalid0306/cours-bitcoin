#!/usr/bin/env node

//Ce mini programme a pour but de suivre le cours du bitcoin via l'API de Coindesk et l'aide du module axios. 
//Il suffit d'ouvrir un terminal est de saisir la commande "./btc.js <devise de votre choix >" par exemple : ./btc.js EUR

//Pour importer le module axios
const axios = require("axios");

async function main() {
    
    /*S'assurer qu'un argument est rentrée, 
    mettre l'argument en masjucule si il ne l'était pas
    et si aucun argument n'est rentrée alors la variable sera en 'USD' par défaut*/
    const currency = process.argv[2] 
    ? process.argv[2].toUpperCase()
    : 'USD';
  
    // Trycatch est necessaire pour gérer les potentielles erreurs d'Axios
    try { 
    
    //L'url de l'API de Coindesk
    const url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
    
    //Chemin pour accéder à l'API de Coindesk(request http) 
    const { data } = await axios.get(url);

    //Reponse en cas de saisi de devise inconnue
    if (!data.bpi[currency]) {
      throw new Error("Devise inconnue");
    }
    //Obtenir les infos concernant la dernière màj sur les crypto
    const updatedAt = data.time.updated;
    //Obtenir le taux des crypto
    const rate = data.bpi[currency].rate;
    //afficher le résultat
    console.log(`> 1 BTC = ${rate} ${currency} (${updatedAt})`);
  } catch (error) {
    //pour afficher les erreurs en string et non sous format debug
    console.error(error.toString());
  }
}

main();
