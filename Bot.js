//Vous aurez besoin du module discord.js qui lui appelle l'API de Discord
const Discord = require("discord.js");
var score = 0;
//Vous appellez une fonction de l'objet créé au-dessus qui permet de récupérer un objet utilisateur client qui représente le bot
const bot = new Discord.Client();

bot.on("ready", function() {
    //ici vous afficherez dans le terminal que le bot est bien connecté
    console.log("Carapuce est dans les places !");
});
//la ligne suivante permet d'indiquer à l'objet Discord qui est votre bot afin qu'il puisse se connecter
bot.login("ODMyOTYwNTI4NTUyNTU4NjMz.YHrY8Q.I777b8JRUB3XQFIN2qj2rTEJVeE");
//ici vous regardez quand le bot est en ligne et qu'il voit passer un message (peu importe le serveur)
bot.on("message", message => {
    //vous regardez alors si le contenu du message est strictement égale à "!ping "
    if (message.content === "!caraping") {
        //si oui vous arrivez ici et vous envoyez, dans le channel d'où provient le message,"Carapong !"
        message.channel.send("Carapong !");
    }
    if (message.content === "!carabonjour") {
        message.reply("carabonjour à toi !");
        //message.react(":carapuce:");
        // message.react(bot.emojis.cache.get("832982797455065119"));
    }
    if (message.content.startsWith("!pin")) {
        message.pin();
    }


    if (message.content === "!caraquiz") {
        score = 0
        message.channel.send("Nous allons jouer à un cara-quiz! \nPour répondre il te suffira de donner la lettre correspondante à la réponse que tu aura choisi :)", {
            embed: {
                color: 3447003,
                description: "__**question n°1:**__",
                fields: [{
                    name: "combien existe t-il de type de pokémon ( exemple : le feu)",
                    value: " A: 12" + " B: 15" + " C: 18"
                }]
            }
        }).then(collected => {
            const filter = (Response) => {
                return true
            }

            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const response = collected.first();
                    if (response.content === 'A') {
                        message.reply("mauvaise réponse")
                        message.channel.send(`${score}` + "/1")
                        message.channel.send("passons à la question suivante.")
                    } else if (response.content === 'C') {
                        score = score + 1
                        message.reply("bonne réponse")
                        message.channel.send(`${score}` + "/1")
                        message.channel.send("passons à la question suivante.")
                    } else if (response.content === 'B') {
                        message.reply("mauvaise réponse")
                        message.channel.send(`${score}` + "/1")
                        message.channel.send("passons à la question suivante.")
                    }
                })

        });

    }


    if (message.content === "passons à la question suivante.") {
        message.channel.send({
                embed: {
                    color: 3447003,
                    description: "__**question n°2:**__",
                    fields: [{
                        name: "quel est le nom du premier pokemon",
                        value: " A: bleu" + " B: blanc" + " C: jaune"
                    }]
                }
            })
            .then(collected => {
                const filter = (Response) => {
                    return true
                }

                message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const response = collected.first();

                        if (response.content === 'A') {
                            score = score + 1
                            response.reply("bonne réponse")
                            message.channel.send(`${score}` + "/2")
                            message.channel.send("passons à la question suivante.")
                        } else if (response.content === 'C') {
                            message.reply("mauvaise réponse")
                            message.channel.send(`${score}` + "/2")
                            message.channel.send("passons à la question suivante.")
                        } else if (response.content === 'B') {
                            message.reply("mauvaise réponse")
                            message.channel.send(`${score}` + "/2")
                            message.channel.send("passons à la question suivante.")
                        }
                    })

            });
    }


    if (message.content === "!carahelp") {
        //on envoie un message de type embed dans le channel d'où provient le message
        message.channel.send({
            embed: {
                color: 3447003,
                description: "__**Les différentes commandes**__",
                fields: [{
                        name: "!carahelp",
                        value: "Pour afficher cette aide."
                    },
                    {
                        name: "!carabonjour",
                        value: "vous réponds"
                    },
                    {
                        name: "!caraping",
                        value: "Pong !"
                    },
                    {
                        name: "!pin",
                        value: "Epingle le message qui commence par cette commande"
                    },
                    {
                        name: "!emojiliste",
                        value: "liste des émojis"
                    },
                    {
                        name: "!caraquiz",
                        value: "un quiz"
                    }
                ]
            }
        });
    }
    if (message.content === "!emojiliste") {
        const emojiliste = message.guild.emojis.cache.map((e) => `${e} => :` + e.name + `:`);
        message.channel.send(emojiliste);
    }

});