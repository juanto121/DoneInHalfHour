import srt
import sys
import copy
import ffmpeg
import subprocess

file = "original.srt"

def subtract_initial(subtitle, initial):
	subtitle.start = subtitle.start - initial.start
	subtitle.end = subtitle.end - initial.start
	# print(subtitle)
	return subtitle

def find_subs_with_word(word, subs):
	selected = []
	for sub in subs:
		if(word in sub.content):
			index = sub.content.index(word)
			sub.content = sub.content[0:index] + "<font color=\"#ffd234\">" + sub.content[index:index+len(word)] + "</font>" + sub.content[index+len(word)+1:]
			selected.append(sub)
	return selected

def align_to_word(word):
	text = open(file, 'r')
	subs = srt.parse(text)
	subtitles = list(subs)
	subs_with_word = find_subs_with_word(word, subtitles)
	initial_sub = subs_with_word[0]
	initial_sub_index = initial_sub.index
	sub_window = subtitles[initial_sub_index-3:initial_sub_index+30]
	startin_sub = copy.deepcopy(sub_window[0])
	sub_window = [subtract_initial(x, startin_sub) for x in sub_window]
	output = open("output.srt", "w+")
	output.write(srt.compose(sub_window))
	return startin_sub.start.seconds

def generate_clip(movie_file, time):
	subprocess.call(['ffmpeg', '-ss', str(time), '-i', movie_file, '-t', '20', '-vf', 'subtitles=output.srt', 'clip.mp4'])


movie_file = sys.argv[2]
word = sys.argv[1]

time_alignment = align_to_word(word)
generate_clip(movie_file, time_alignment)
