# An Asset Pipeline

An asset pipeline is a set of tools that handles your frontend files (JavaScript, CSS, Images and Fonts) for you. This project does some preprocessing on them:

* JavaScript files are compiled to a single, minified JavaScript file using its dependency graph. In addition, they are compiled from modern JavaScript (ES2015) to JavaScript that runs in almost all browsers.
* You write SCSS which is compiled to a single, minified CSS file. In addition, the CSS attributes are prefixed with vendor specific prefixes according to your configuration.
* Your fonts and images are copied to the right directory.

In addition, the resulting file names are altered (see the section about [Manifest files and cache busting](#user-content-manifest-files-and-cache-busting)).

It's the core philosophy of this package that you don't need to know what technology is used in the pipeline. Currently it is a mix of Webpack and Gulp, but this could change later. The idea is that it still offers the same commands and understands the same configuration.

## Manifest Files and Cache Busting

The asset pipeline creates files with hashes in their names (for cache busting). It creates so called manifest files so that your application can find the files. You can for example use it together with Rails with the [rails_external_asset_pipeline](https://rubygems.org/gems/rails_external_asset_pipeline) gem. You can configure it via your `package.json`.

The pipeline will create a manifest file for each of the four file types. The manifest file contains the mapping between the artifact name and the path to the file. For example:

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
