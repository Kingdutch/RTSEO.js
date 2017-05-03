# YoastSEO.js

Text analysis and assessment library in JavaScript. This library can generate interesting metrics about a text and assess these metrics to give you an assessment which can be used to improve the text.

This is a compiled version of the original source files found on [Yoast/YoastSEO.js](https://github.com/Yoast/YoastSEO.js). The version in this repo
is meant to be used with the [Real-Time SEO Module](https://www.drupal.org/project/yoast_seo) for Drupal.

## Issues

Any issues for the Drupal module should be reported in the [drupal.org issue queue](https://www.drupal.org/project/issues/yoast_seo).
Any issues for the YoastSEO.js library should be reported in the [YoastSEO.js issue tracker](https://github.com/Yoast/YoastSEO.js/issues). This distribution may not be the latest version of the YoastSEO.js library for compatibility reasons with the Drupal module so care should be taken that issues may already be fixed in a later release.

## Maintainers

This repository is maintained by GoalGorilla and has no affilliation with Yoast or the YoastSEO.js project.

## License

This distribution follows the same GPL license as the [original source](https://github.com/Yoast/YoastSEO.js/). Please see [License](LICENSE) file for more information.

## Developer instructions

If you want to update the version of the YoastSEO.js file in this repostory do the following.

Clone the original YoastSEO.js files from their github repo and checkout the version you want to use in a separate folder:

`git clone https://github.com/Yoast/YoastSEO.js.git`

Make sure you have grunt-cli installed using `yarn global add grunt-cli`. Install all project dependencies using `yarn install`.

Run `grunt` in the root of the YoastSEO.js directory to compile source to a distributable file.

Copy the contents of the `dist/` folder to this repository. Tag and release the new version.
