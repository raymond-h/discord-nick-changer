require('dotenv').config();

const Discord = require('discord.js');
const got = require('got');
const { startCase } = require('lodash');
const randomItem = require('random-item');

const client = new Discord.Client();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchNouns() {
    const res = await got.get(process.env.NOUN_LIST_URL);

    return res.body
        .toString('utf8')
        .split(/[\r\n]+/)
        .filter(s => !!s.trim())
        .map(startCase);
}

async function main() {
    const nounList = await fetchNouns();

    await client.login(process.env.DISCORD_TOKEN);

    client.on('message', msg => {
        if(Math.random() >= 0.8) {
            return;
        }

        if(msg.guild != null && msg.guild.id === process.env.DISCORD_GUILD_ID &&
            msg.member.id === process.env.DISCORD_USER_ID) {

            msg.member.setNickname(
                randomItem(nounList)
            )
            .catch(err =>
                console.error(err.stack)
            );
        }
    });
}

main()
.catch(err =>
    console.error(err)
);
