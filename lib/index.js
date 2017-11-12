require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    await client.login(process.env.DISCORD_TOKEN);

    const guild = client.guilds.get(process.env.DISCORD_GUILD_ID);

    const member = await guild.fetchMember(process.env.DISCORD_USER_ID);

    for(let i = 0; i < 5; i++) {
        await delay(3 * 1000);

        await member.setNickname(`Hurr-${i}`);
    }

    await client.destroy();

    process.exit(0);
}

main()
.catch(err =>
    console.error(err)
);
