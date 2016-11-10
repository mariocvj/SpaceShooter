backgroundpic="space.jpg"
cursorpic="cursor.png"

import pygame
import sys
from pygame.locals import *

pygame.init()

screen=pygame.display.set_mode((758,530),0,32)

background=pygame.image.load(backgroundpic).convert()
cursor=pygame.image.load(cursorpic).convert_alpha()

while True:
	for event in pygame.event.get():
		if event.type == QUIT:
			pygame.quit()
			sys.quit()

	screen.blit(background, (0,0))
	x,y=pygame.mouse.get_pos()
#	x -= cursor.get_width()
#	y -= cursor.get_height()
	
	screen.blit(cursor, (x,y))
	
	pygame.display.update()