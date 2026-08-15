
# Web MP3 Player

I made this project for Hack Clubs Horizons. This project is an attempt for me to make a cute y2k themed MP3 player, complete with different themes I made for the iPods!You can upload local mp3 files to play + display them in the image of the mp3 player!

(ReadMe was edited entirely in the GitHub Website, Not VS Code)

## Screenshots!
![](Assets/Projecct-Screenshots/Screenshot%202026-08-14%20164700.png)
![](Assets/Projecct-Screenshots/Screenshot%202026-08-14%20164639.png)
![](Assets/Projecct-Screenshots/Screenshot%202026-08-14%20164623.png)
![](Assets/Projecct-Screenshots/Screenshot%202026-08-14%20164554.png)




## Functions
- Plays mp3 files locally off your computer
- Play/Pause/Next/select/menu Buttons
- Progress bar (You can move it around to different times in the music)
- Multiple songs supported!You just need to select multiple at a time in your files.
- shuffle mode! If you want to switch things up, you can go to the menu and toggle shuffle. It will not repeat a song until it has cycled through your added list.
- Themes! This was my favorite part to work on. In the menu you can cycle through all the ipod skins and backgrounds separately to achieve your desired look.
- All the navigation is available on the ipod picture
- Below the player is a button to add music files.

## Code Used

- html
- javascript
- css
- 
## Dependencies

This project (tried to) use [jsmediatags](https://github.com/aadsm/jsmediatags) to read MP3 metadata.

## How It Was Made 

- Set up the text and appearances with html and css, I already had the assets pre-collected or made so it gave me a good visual. (Did initially have a css ver. of the player based on the one I took inspiration from in the credits section before switching to my desired themed ones)
- Added in all my assets (which I later alphabetized bc why not)
- Got a single-upload song display going to adjust css and html (Positioning and styling essentially) Just to get a good base functioning player down before adding more complex functions and diving into JavaScript More
- Made all the buttons functioning and gave (Play, next, etc).
- I then added themes and worked on the menu, getting shuffle to work (Got put on the backburner for a while but fixed it recently)
- Added an album cover section (that was SUPPOSED to be a backup for songs with no cover metadata)
- Then I fixed the autoplay bug so that it actually proceeded to the next song without pressing the next button.
- Bug I dealt with most: Positioning bugs. Especially: Song title, marquee, and the buttons. Which are transparent so sometimes when I thought it was broken it was just pushed down somewhere.
- I dont know enough JavaScript and the internet was failing me on how to make an updating album image. So thats a future project.


## How to use!

- Access here -> [https://savannah-k.github.io/online-mp3-player-projects/]
- Use device controls: ▶ / ❚❚ — Play / Pause
▶ (next) / ◀ (previous) — Skip tracks
MENU — Open the menu (Themes, Music Settings, Return)
✭ (select) — Confirm a menu selection / cycle a highlighted setting. The buttons themselves are transparent but the image coincides with the buttons.
- Press Menu to access Themes and Shuffle
- Menu can be exited by either pressing menu again or selecting Exit in the menu.

## Limitations and Issues

- I for the life of me could not get album covers to read and show up in the player, so that is a future project. Enjoy art by me in the meantime.
- Some of the mp3 player themes are a bit blurred and some backgrounds look scuffed bc of repeating tiles
- Oh, and Project Screenshots file has a typo (Projecct)
- Some of the buttons you might need to click around the area a bit. So maybe not the most accurate.

## AI Disclosure

- For some of the JavaScript, I used AI as a tutor. If I ran into bugs and was struggling extensively to figure them out or fix them myself, I would use AI as a debugging tool and mentor. I still worked through, tested, and implemented the project myself.

## Acknowledgements + Credits

 - [I took a lot of inspiration from DEFKON_1's iPod Music Player](https://codepen.io/DEFKON_1/pen/KwPwrPW)
 - Album Cover Art: By Me
 - Backgrounds and patterns sourced mostly from pinterest and [scripteds resources](https://scripted.neocities.org/)
 - I do not own and did not make any of the backgrounds or skin arts.

   # This is my first ever README so please keep that in mind.
 
