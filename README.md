# proximax-catapult-explorer

This document briefly describes how to download the project and install the dependencies to make it work properly.

It is necessary to have installed "Node.js" in version 10.18.0 or higher and "NPM" in the latest available version.

It is recommended to install ["Serve"](https://www.npmjs.com/package/serve) in NPM, to test the result of the compiled and minified project


## Project setup

**In the terminal or console of the operating system**

After "git clone" to the repository, enter the container folder, commonly called "xpx-chain-explorer".

```
cd xpx-chain-explorer
```

Once inside the directory, the dependencies must be installed, through NPM.

*Verify if you need administrator permissions.*

```
npm install
```

If you have problems installing the dependencies you can deal with the flag --unsafe-perm of NPM.

```
npm install --unsafe-perm
```

When the dependencies have been installed, it is already possible to run the project for development or to build it for production.

#### *For Run (Hot reload)*
Depending on the type of sirius network, we will execute different commands.
- *For bctestnet:*

```
npm run start-test
```
- *For bcstage:*

```
npm run start-stage
```
- *For mainnet:*

```
npm run start-prod
```

#### *For build (Minified and optimized)*.
- *For bctestnet:*

```
npm run build-test
```
- *For bcstage:*

```
npm run build-stage
```
- *For mainnet:*

```
npm run build-prod
```


## Serve the project

When the "npm run build" script is executed, a directory is automatically created, in which the optimized project for production is stored, within the directory is the index.html file, which is the main file, however this file it must be served locally to be able to view it in the browser.

Now we will use the ["Serve"](https://www.npmjs.com/package/serve) command of NPM.

We go to the project folder (in this case called "xpx-chain-explorer"), once there, we will execute the "serve" command accompanied by the folder that contains our main file "Index.html" (The folder is "dist ").

```
serve dist/
```

Once done, a message should appear indicating that it is running a local host service with port 5000.
