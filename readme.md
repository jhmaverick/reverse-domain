## Get IPs from a domain's list.

`npm install -g reverse-domain`

`reverse-domain --file path/to/list.txt`

list.txt
```text
google.com
youtube.com
facebook.com
globo.com
acervorobertomarinho.com.br
adnight.com.br
aescolha.com.br
aaaaaaaa.aaa
```


Result
```text
Loading list...

== 172.217.29.110 =========================================================
[172.217.29.110] - google.com

== 172.217.29.46 =========================================================
[172.217.29.46] - youtube.com

== 31.13.85.36 =========================================================
[31.13.85.36] - facebook.com

== 186.192.90.5 =========================================================
[186.192.90.5] - globo.com
[186.192.90.5] - acervorobertomarinho.com.br
[186.192.90.5] - adnight.com.br
[186.192.90.5] - aescolha.com.br

== undefined =========================================================
[undefined] - aaaaaaaa.aaa

```