##Contribute
Contributions are welcome. If you'd like to implement a new feature, please open an issue first.

###Build
To install build dependencies, run `npm install`.

Run webpack with `npm run build`. Built files can be found in the `dist/` directory. You can also use `npm run dev`; it's configured to do exactly the same thing, except it will continue watching for any changes you make, and recompile.

If you plan to submit a pull request, please test your changes. You can create a symbolic link from the module to your project to make those tests easier.

```
# inside of project/node_modules/ directory (module doesn't exist here yet)
ln -s ../../path/to/module/repository/ react-gif-player
```
And you can delete that symbolic link (without deleting the linked directory) with `rm react-gif-player` (no slash).

You can also try doing this with [npm link](https://docs.npmjs.com/cli/link). However, it's been known to cause issues occasionally with duplicate peer dependencies, so be warned.
