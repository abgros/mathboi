# bot.py
import os
import discord

import my_functions as my

from time import time
from math import sqrt
from random import randint, choice, random, shuffle, uniform
from dotenv import load_dotenv

### Database

import tinydb
import tinydb.operations

### Image stuff

import numpy as np
import PIL
import PIL.Image as Image
import PIL.ImageDraw as ImageDraw
import PIL.ImageFont as ImageFont
import colorsys as coloursys

### Chess

import chess
import chess.svg
import pyvips

###

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client(activity=discord.Game(name='Bedwars'))
lb = tinydb.TinyDB('lb.json')

doing_math_in = {'command': 'math'}
doing_scramble_in = {'command': 'scramble'}
doing_typing_in = {'command': 'typing'}
doing_eagle_in = {'command': 'eagle'}
doing_chess_in = {'command': 'chess'}

doing_in = [doing_math_in, doing_scramble_in, doing_typing_in,
            doing_eagle_in, doing_chess_in]


# 1520 common words
with open('wordlist.txt') as f:
    wordlist = [i.rstrip('\n') for i in f.readlines()]

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
        print(f"Message sent in {message.guild.name}: {message.content}")
        return

    message_text = message.content.lower()
    username = str(message.author)

    if message_text == 'do help':
        await message.channel.send("**Commands List:**\ndo help (this one)\ndo math\ndo scramble\ndo typing\ndo eagle\ndo chess\ndo leaderboard")

    if message_text == 'do math':
        if message.channel.id not in doing_math_in.keys():
            doing_math_in[message.channel.id] = []
            response = my.problem()
            answer = str(round(eval(response)))
            response = response.replace("**", "^").replace("sqrt", "√").replace(")", "").replace("(", "")
            
            await message.channel.send("**DO MATH**\n" + "`" + response + "`")
            doing_math_in[message.channel.id] = [answer, time()]

            return
        
        await message.channel.send("Already doing math.")

    if message_text == 'do scramble':
        if message.channel.id not in doing_scramble_in.keys():
            doing_scramble_in[message.channel.id] = []
            answer = choice(wordlist)
            response = my.scramble(answer)
            
            await message.channel.send("**UNSCRAMBLE THIS**\n" + "`" + response + "`")
            doing_scramble_in[message.channel.id] = [answer, time()]

            return

        await message.channel.send("Already doing scramble.")


    if message_text == 'do typing':
        if message.channel.id not in doing_typing_in.keys():
            doing_typing_in[message.channel.id] = []
            words = []
            for i in range(randint(4, 10)):
                words += [choice(wordlist)]
            img_name = 'typing_' + str(message.channel.id) + '.png'
            answer = ' '.join(words)
            
            await message.channel.send("**TYPE THESE:**")
            await message.channel.send(file=discord.File(my.draw_text(words, img_name)))
            doing_typing_in[message.channel.id] = [answer, time()]

            return
        
        await message.channel.send("Already doing typing.")

    if message_text == 'do eagle':
        if message.channel.id not in doing_eagle_in.keys():
            doing_eagle_in[message.channel.id] = []
            img_name = 'eagle_' + str(message.channel.id) + '.png'
            grid = randint(6, 9)
            difficulty = uniform(0.01, 0.05)
            answer = ','.join(my.draw_squares(10, 500, grid, difficulty, img_name))
            
            await message.channel.send("**FIND THE OFF SQUARE**\n" + "Format: `row,column`")
            await message.channel.send(file=discord.File(img_name))
            doing_eagle_in[message.channel.id] = [answer, time()]

            return

        await message.channel.send("Already doing Eagle.")

    if message_text == 'do chess':
        if message.channel.id not in doing_chess_in.keys():
            doing_chess_in[message.channel.id] = []
            puzzle = my.get_puzzle()
            fen = puzzle[0]
            answer = puzzle[1]
            white_to_move = puzzle[2]
            initial = puzzle[3]
            
            img_name = 'chess_' + str(message.channel.id) + '.png'
            
            if white_to_move:
                await message.channel.send("**WHITE TO MOVE**\n")
            else:
                await message.channel.send("**BLACK TO MOVE**\n")
                
            await message.channel.send(file=discord.File(my.render(fen, img_name, white_to_move, initial)))
            doing_chess_in[message.channel.id] = [answer, time()]
            return

        await message.channel.send("Already doing Chess.")

    if message_text == 'do leaderboard':
        total_wins = lambda x: x['math'] + x['scramble'] + x['typing'] + x['eagle'] + x['chess']
        highest = lb.all()
        highest.sort(key=total_wins, reverse=True)
        highest_players = [entry['user'] for entry in highest]
        SHOW_TOP = min(len(highest), 5)
        
        output = "**LEADERBOARD**"
        for p in range(SHOW_TOP):
            output += f"\n{p+1}: **{total_wins(highest[p])} wins `{highest[p]['user']}`**"
            
        # If user has wins but is not on the leaderboard
        if username not in highest_players[:SHOW_TOP]:
            if lb.contains(tinydb.Query().user == username):
                user_index = highest_players.index(username)
                output += f"\n\nYour rank: **{user_index+1}** ({total_wins(highest[user_index])} wins)"
            else:
                output += "\n\nYour rank: **∞** (0 wins lol)"
            
        await message.channel.send(output)

    if message_text == 'chamoy':
        if message.reference is not None:
            try:
                await message.delete()
            except:
                pass
            replied_to = await message.channel.fetch_message(message.reference.message_id)
            await replied_to.reply(file=discord.File('chamoy.mp4'))

            return

    for doing_x_in in doing_in:
        if message.channel.id in doing_x_in.keys():
            if message_text == doing_x_in[message.channel.id][0]:
                elapsed = time() - doing_x_in[message.channel.id][1]
                del doing_x_in[message.channel.id]
                await message.channel.send("**{}** got the answer in {:.3f} seconds.".format(message.author, elapsed))

                # Database update
                game = doing_x_in['command']
                if not lb.contains(tinydb.Query().user == username):
                    lb.insert({'user': username,
                               'math': 0,
                               'scramble': 0,
                               'typing': 0,
                               'eagle': 0,
                               'chess': 0})
                lb.update(tinydb.operations.increment(game), tinydb.Query().user == username)

               
@client.event
async def on_error(event, *args, **kwargs):
    with open('err.log', 'a') as log:
        if event == 'on_message':
            log.write(f'Unhandled message: {args[0]}\n')
        else:
            raise

client.run(TOKEN)
