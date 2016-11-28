# An Asset Pipeline

This is an asset pipeline for projects that need the following:

* ECMAScript 2015: Bundle a file and all modules it imports into a single file, compiling ES2015 to ES5. Minifying the resulting file.
* SCSS: Compile from SCSS to CSS, minifying the resulting file. Allow to reference fonts and images with cache busting.
* Fonts: Copy the font files, add a cache buster to the file name.
* Images: Copy the image files, add a cache buster to the file name.

It creates files with hashes in their names (for cache busting). It creates so called manifest files so that your application can find the files. You can for example use it together with Rails with the [rails_external_asset_pipeline](https://rubygems.org/gems/rails_external_asset_pipeline) gem. You can configure it via your `package.json`.

It's the core philosophy of this package that you don't need to know what technology is used in the pipeline. Currently it is a mix of Webpack and Gulp, but this could change later. The idea is that it still offers the same commands and understands the same configuration.

## Manifest Files and Cache Busting

The pipeline will create a so called manifest file for each of the four file types. The manifest file contains the mapping between the artifact name and the path to the file. For example:

```json
{
  "sandbox.js": "/assets/sandbox-6ae3a24d57849bd52727.js"
}
```

This means that if you want to deliver the file `sandbox.js`, you will find it at "/assets/sandbox-6ae3a24d57849bd52727.js". In your web application you can then provide a helper that can translate between the artifact name and the path.

In your SCSS we provide a helper to do exactly that for font and image files. Let's say you have a file called `background.png`, in your SCSS you can do the following:

```scss
body {
  background: asset-url("background.png") no-repeat
}
```

This will put in the correct `url` for the background.png with its cache buster.

## Configuration

All configuration is written in the `package.json` of your project.

### JavaScript

```json
{
  "jsConfig": {
    "entryPoints": {
      "sandbox": "./javascripts/main.js"
    },
    "target": {
      "directory": "build/assets/javascripts"
    },
    "includePaths": [
      "node_modules",
      "javascripts"
    ],
    "manifest": "build/manifests/javascript.json",
    "baseUrl": "/assets",
    "alias": {
      "jquery": "jquery/src/jquery"
    }
  }
}
```

So what are you configuring here?

* `entryPoints`: An object describing the artifacts. The keys are the names of the artifacts, the values are the according path to the entry point.
* `target`: The directory where the resulting files should be put.
* `includePaths`: Directories that should be added to the include path for imports.
* `manifest`: The path to the manifest file that should be created. Read more about the manifest file above.
* `baseUrl`: The base URL for the JavaScript files.
* `alias`: You can alias imports if they have weird directory structures.

### SCSS

*Todo*

### Fonts

*Todo*

### Images

*Todo*

## Example

*Todo*

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fejo-dk/asset-pipeline. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
