To install all packages run:
-> npm install

Issues:
- htmlbuild node (htmlbuild.js in tasks/options) was originally names html-build. To install correctly:
--> Modify 'package.json' line  "grunt-htmlbuild" : "*" to "grunt-html-build" : "*"
--> Run 'npm install' command
--> Once installed, change the package.json back to "grunt-htmlbuild" : "*"
--> Modify the folder name in 'node_modules' folder from 'grunt-html-build' to 'grunt-htmlbuild'

- Any other time you run 'npm install', you will need to modify the grunt-htmlbuild line in 'package.json' file, as above.