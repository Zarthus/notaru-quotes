#!/usr/bin/env ruby

require 'yaml'
require 'time'
require 'cgi'


OUT = File.join(__dir__, "../out", "index.html")
IN = File.join(__dir__, "../out", "quotes.yml")
HTML_TPL = File.join(__dir__, "../res", "template.html")
HTML_TPL_Q = File.join(__dir__, "../res", "quote-tpl.html")

def compile_quotes_file(html_tpl, yaml_file, indentation_level = 0)
  template = File.read(html_tpl)
  yml = YAML.load(File.open(yaml_file)).reverse()
  output = ''

  yml.each do |quote|
    escapedQuote = quote["quote"]
        .gsub(/[\[\(]*[\d+:]{2,}[\]\)]*(?:\s?(?:PM|AM|pm|am)\s?)? (<[^ >]+>)/, '\1')  # remove timestamps
        .gsub(/(?<! \|\|) (<[^ >]+>) /, ' || \1 ') # Prepend || to nicks
    escapedQuote = CGI.escapeHTML(escapedQuote)
        .gsub("||", "<br>")  # we often use two pipes to denote a newline in quotes.

    output << template.gsub("{{ id }}", quote["id"].to_s)
        .gsub("{{ quote }}", escapedQuote)
        .gsub("{{ author }}", quote["added_by"].gsub('_', ' '))
        .gsub("{{ time_human }}", quote["created_at"].utc.strftime("%A, %d %B %Y %T %Z"))
        .gsub("{{ time }}", quote["created_at"].iso8601)
        .gsub("{{ deleted }}", (quote["deleted"] ? "true" : "false"))
        .gsub("{{ class_deleted }}", (quote["deleted"] ? "quote-status-deleted" : "quote-status-active"))
        .gsub(/(https?:\/\/[^\s>]+)/, '<a href="\1">\1</a>')
        .gsub(/\x02(.*?)(\x02|\x0F|$)/,'<b>\1</b>')

  end

  output = output.split("\n").map { |l| '    ' * indentation_level << l }.join("\n") if (indentation_level > 0)
  output
end

html = ''
File.open(HTML_TPL).each do |line|
  ln = line.strip()
  if ln == '{{ include template }}'
    html << "\n"
    html << compile_quotes_file(HTML_TPL_Q, IN)
    html << "\n"
    next
  elsif ln == '{{ compile info }}'
    html << '&copy; ' + Time.now.utc.year.to_s + ' &middot; file generated on ' + Time.now.utc.iso8601
    next
  end

  html << line
end

File.open(OUT, 'w+') do |f|
  f.write(html)
end
