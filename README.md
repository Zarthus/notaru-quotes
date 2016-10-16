# Quote Website

This is a minimalistic way to display the quotes for #lobby's IRC bot (Notaru) to a website.

It requires ruby to compile the quotes file to a HTML file.

## Setup

- Download the quotes file from http://stats.lynvie.com/quotes/quotes.yml and put it in `out`
- Run `ruby src/compile.rb`
- Symlink `out` to your webservers public folder.

