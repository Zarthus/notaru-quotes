require 'yaml'
require 'time'
require 'cgi'


PATTERN_RPL = "{{ include template }}"
OUT = File.join(__dir__, "../out", "index.html")
IN = File.join(__dir__, "../out", "quotes.yml")
HTML_TPL = File.join(__dir__, "../res", "template.html")
HTML_TPL_Q = File.join(__dir__, "../res", "quote-tpl.html")

def compile_quotes_file(html_tpl, yaml_file)
  template = File.open(html_tpl).readlines().join("\n")
  yml = YAML.load(File.open(yaml_file))
  output = ''

  yml.each do |quote|
    output << template.gsub("{{ id }}", quote["id"].to_s)
        .sub("{{ quote }}", CGI.escapeHTML(quote["quote"]))
        .sub("{{ adder }}", quote["added_by"])
        .sub("{{ time }}", quote["created_at"].iso8601)
        .sub("{{ deleted }}", (quote["deleted"] ? "true" : "false"))
        .gsub("\n", "")
    output << "\n"
  end

  output
end

html = ''
File.open(HTML_TPL).each do |line|
  if line.strip() == PATTERN_RPL
    html << "\n"
    html << compile_quotes_file(HTML_TPL_Q, IN)
    html << "\n"
    next
  end

  html << line
end

File.open(OUT, 'w+') do |f|
  f.write(html)
end
