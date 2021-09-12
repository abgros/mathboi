import os
import discord # you need to install the "discord" module
from dotenv import load_dotenv # you need to install the "dotenv" module

# First step: create a bot application
# https://discord.com/developers/applications
# From there navigate to the "bot" tab and click "reveal token"
# Create a file called ".env" with the following contents:
# DISCORD_TOKEN=xyz
# This is so you can share your code without exposing your private discord token

# Put your function definitions in a different file ("my_functions.py")
import my_functions

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client(activity=discord.Game(name='Playing xyz'))

# Load a text file
list_of_lines = open('sometext.txt').readlines()
# ['line1', 'line2', 'line3', ...]

@client.event
async def on_ready():
    guilds = await client.fetch_guilds(limit=150).flatten()
    print(f"{client.user} is connected to the following guilds:")
    for guild in guilds:
        print(f"{guild.name} [{guild.id}]")
    print('')

@client.event
async def on_message(message):
    if message.author == client.user:
        # To prevent the bot from responding to itself
        return

    # message.content is the text content of each message sent

    if message.content == 'test command':
        print("Command recieved - 'test command'")
        # Tip: always send one big message with \n rather than multiple small messages
        await message.channel.send("Command recieved.")
        return

    if message.content == 'send an image please':
        # you can also send videos
        await message.channel.send(file=discord.File('my_file.png'))
        return

@client.event
async def on_error(event, *args, **kwargs):
    with open('err.log', 'a') as log:
        if event == 'on_message':
            log.write(f'Unhandled message: {args[0]}\n')
        else:
            raise

client.run(TOKEN)
