import { REST, Routes } from 'discord.js';
const commands = [
    {
      name: 'create',
      description: 'Create short url',
    },
  ];

  const TOKEN =  process.env.TOKEN;

  const rest = new REST({ version: '10' }).setToken(TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands('1384597432138072074'), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }