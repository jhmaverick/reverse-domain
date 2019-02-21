#!/usr/bin/env node

/*
 * This file is part of reverse-domain.
 *
 * (c) João Henrique <joao_henriquee@outlook.com>
 *
 * For the full copyright and license information, please view the LICENSE file that was distributed with this source code.
 */

const path = require('path');
const dns = require('dns');
const fs = require('fs-extra');
const argv = require('yargs').argv;
const chalk = require('chalk');

let file = argv.file || "list.txt";
let arquivo = path.resolve("./", file);

let i = 0, lista = [], grupo = {};

if (fs.existsSync(arquivo)) {
    console.log("Loading list...");

    fs.readFile(arquivo, 'utf8', function (err, contents) {
        contents = contents.replace(/(?:\r\n|\r|\n)/g, '\n');
        lista = contents.split("\n");

        let final = function () {
            for (let key in grupo) {
                let nivel = grupo[key];

                console.log("\n" + chalk.bold("== " + key + " ========================================================="));
                for (let i = 0; i < nivel.length; i++) {
                    let color = (nivel[i].ip == undefined) ? "red" : "green";
                    console.log(chalk[color].bold("[" + nivel[i].ip + "]") + " - " + nivel[i].domain);
                }
            }
        }

        let callback = function () {
            if (i >= lista.length) {
                final();
                return;
            }
            let domain = lista[i].trim();
            i++;

            dns.lookup(domain, function (err, addresses, family) {
                let nome_grupo = addresses || "undefined";

                if (!grupo[nome_grupo]) grupo[nome_grupo] = [];

                grupo[nome_grupo].push({"ip": addresses, "domain": domain});
                callback();
            });
        };

        callback();
    });
} else {
    console.log("File \"" + file + "\" not found.\n" +
        "Enter the path to the file or create a file named \"list.txt\" in the current directory.\n\n" +
        "Ex: \"reverse-domain --file path/to/file.txt\"");
}
