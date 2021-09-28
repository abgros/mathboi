from time import time
from math import sqrt
from random import randint, choice, random, shuffle, uniform
import numpy as np
import PIL
import PIL.Image as Image
import PIL.ImageDraw as ImageDraw
import PIL.ImageFont as ImageFont
import colorsys as coloursys
import chess
import chess.svg
import pyvips

def problem():
    # 2 - 4 terms
    # 50% chance of a bare number
    # 40% chance of multiplication/division
    # 10% chance of exponents/roots
    
    terms = randint(2, 4)
    output = ""
    for i in range(terms):
        if randint(0, 1):
            output += f"{randint(1, 40)}"
        else:
            if randint(0, 4):
                if randint(0, 1):
                    output += f"{randint(1, 10)}*{randint(1, 10)}"
                else:
                    integer1 = randint(2, 10)
                    integer2 = randint(2, 10)
                    output += f"{integer1*integer2}/{integer1}"
            else:
                if randint(0, 1):
                    output += f"{randint(2, 20)}**2"
                else:
                    output += f"sqrt({randint(2, 20)**2})"

        if i < terms - 1:
            if randint(0, 1):
                output += " + "
            else:
                output += " - "
    return output


def scramble(word):
    while True:
        output = list(word)
        shuffle(output)
        output = ''.join(output)
        if output != word:
            return output


def draw_text(words, img_name):
    font = ImageFont.truetype(r'c:\windows\fonts\arial.ttf', 100)
    h, w = (130 * len(words) + 100), 700
    bg_image = np.dot(np.ones((h,w,3), dtype='uint8'), np.diag(np.asarray(((0, 0, 0)), dtype='uint8')))
    image0 = Image.fromarray(bg_image)
    draw = ImageDraw.Draw(image0)
    for i in range(len(words)):
        draw.text((50, (130 * i + 50)), words[i], font=font, fill='rgb(255, 255, 255)')
    image0.save(img_name)
    return img_name


def draw_squares(border, img_size, grid, difficulty, img_name):
    im = Image.new('RGB', (img_size, img_size))
    square_img = np.array(im)

    x_pos = border
    y_pos = border
    ans_x = randint(1, grid)
    ans_y = randint(1, grid)
    size = img_size - border - border
    
    square_size = round((10 * size)/(11 * grid - 1))
    gap = round(square_size/10)
  
    h = randint(1, 360)/360
    l = randint(10, 90)/100
    s = randint(10, 90)/100
  
    if randint(0, 1):
        l2 = l + difficulty
    else:
        l2 = l - difficulty

    square_colour = [round(i * 255) for i in coloursys.hls_to_rgb(h, l, s)]
    off_square_colour = [round(i * 255) for i in coloursys.hls_to_rgb(h, l2, s)]

    for i in range(1, grid + 1):
        x_pos = border
        for j in range(1, grid + 1):
            if j == ans_x and i == ans_y:
                # special square
                square_img[x_pos:x_pos + square_size, y_pos:y_pos + square_size] = off_square_colour
            else:
                square_img[x_pos:x_pos + square_size, y_pos:y_pos + square_size] = square_colour
            x_pos += square_size + gap
        y_pos += (square_size + gap)
    
    im2 = Image.fromarray(square_img)
    im2.save(img_name)
    return [str(ans_x), str(ans_y)]

def render(fen, img_name, white_to_move, initial):
    if white_to_move:
        svg_text = chess.svg.board(chess.Board(fen), size=72, lastmove=initial, orientation=chess.WHITE).encode()
    else:
        svg_text = chess.svg.board(chess.Board(fen), size=72, lastmove=initial, orientation=chess.BLACK).encode()        
    output = pyvips.Image.svgload_buffer(svg_text, dpi=1000)
    output.write_to_file(img_name)

    return img_name

def get_puzzle():
    # n can be 0 to 1857574 - 1
    n = randint(0, 1857573)
    with open("lichess_db_puzzle.csv") as f:
        for i, line in enumerate(f):
            if i == n:
                curr_line = line.split(',')
                break

        initial = chess.Move.from_uci(curr_line[2][:4])
        board = chess.Board(curr_line[1])
        board.push(initial)
        answer = board.san(chess.Move.from_uci(curr_line[2].split(' ')[1])).lower()
        fen = board.fen()
        side_to_move = board.turn

    return [fen, answer, side_to_move, initial]
