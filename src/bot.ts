import { Client, GatewayIntentBits, Events, SlashCommandAssertions, Routes, REST} from 'discord.js';
import { testCommand } from './commands/ping'
const { TOKEN, CLIENT_ID } = require('../config.json');
const rest = new REST({ version: '10' }).setToken(TOKEN);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ]
});



client.once(Events.ClientReady, c =>{
    console.log(`Ready! Logged in as ${c.user.tag}`)
});

client.on('ready', (client:Client<boolean>) => {
    let c = client ? client: null;
    console.log(`Logged in as ${client.user?.tag}!`);
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

  client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
});

async function main(){
    registerGlobalCommands();
    client.login(TOKEN);
}

async function registerGlobalCommands(){
  const commands = [testCommand.data];

    try {
        console.log('Refreshing global commands: ');
        commands.forEach(command => {
            console.log('- ' + command.name);
        })
        if(commands.length === 0) {
            console.log('No global commands to refresh.');
        }

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
        });

        
    } catch(error) {console.log(error)}
}

main();