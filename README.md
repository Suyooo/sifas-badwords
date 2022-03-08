# Bad Words Checker

A replacement for the old SIF Bad Word Checker by GrygrFlzr and Caraxian.
You can use this checker here: https://suyo.be/sifas/badwords/

The word list was generated by trying all combinations of the letters a-z using bruteforce up to a given length, plus
testing a couple of profanity lists against the game's word filter:
* [Shutterstock's List of Dirty, Naughty, Obscene, and Otherwise Bad Words](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words)
* [Google's Bad Word List updated by coffee-and-fun](https://github.com/coffee-and-fun/google-profanity-words)
* [Bad Words from Google's WDYL Project made available by jamiew](https://gist.github.com/jamiew/1112488)
* [Pokémon's Generation V Block List](https://bulbapedia.bulbagarden.net/wiki/List_of_censored_words_in_Generation_V)
* [The washyourmouthoutwithsoap npm Package maintained by thisandagain](https://github.com/thisandagain/washyourmouthoutwithsoap/)
* [The cuss npm Package maintained by Titus Wormer](https://gist.github.com/jamiew/1112488)
* [The Profanity PHP Library maintained by ConsoleTVs](https://github.com/ConsoleTVs/Profanity)

Obviously, a content warning is in effect for wordlist.json, as it contains a lot of slurs and offensive terms in a bunch of languages.