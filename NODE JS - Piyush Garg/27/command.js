import { REST, Routes } from 'discord.js';
const commands = [
    {
      name: 'create',
      description: 'Create short url',
    },
  ];

  const TOKEN = "MTM4NDU5NzQzMjEzODA3MjA3NA.GmiB0a.dTPFWVJUmykdiKTeA5kQbT3wBuZMZFTvPfoUIg";

  const rest = new REST({ version: '10' }).setToken(TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands('1384597432138072074'), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }