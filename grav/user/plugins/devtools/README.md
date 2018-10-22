# Grav Devtools Plugin

The `devtools` is a [Grav](http://github.com/getgrav/grav) Plugin that lets you quickly create a scaffolding for your new plugins and themes.  The plugin provides CLI commands that allow for the quick and easy deployment of a sample scaffolding for your new plugin.

# Installation

## GPM Installation (Preferred)

The simplest way to install this plugin is via the [Grav Package Manager (GPM)](http://learn.getgrav.org/advanced/grav-gpm).  From the root of your Grav install type:

    bin/gpm install devtools

## Manual Installation 

If for some reason you can't use GPM you can manually install this plugin. Download the zip version of this repository and unzip it under `/your/site/grav/user/plugins`. Then, rename the folder to `devtools`.

You should now have all the plugin files under

	/your/site/grav/user/plugins/devtools
	
# Usage

## Plugin Scaffolding

To create a new plugin you simply need to run: `bin/plugin devtools newplugin` and fill in the few questions at the prompts:

```
> bin/plugin devtools newplugin
Enter Plugin Name: MyPlugin
Enter Plugin Description: My New Custom Plugin
Enter Developer Name: Johnny Rotten
Enter Developer Email: johnny@rotten.com

SUCCESS plugin myplugin -> Created Successfully

Path: /home/johnnyr/webroot/grav-installation/user/plugins/myplugin
```

## Theme Scaffolding

To create a new theme you simply need to run: `bin/plugin devtools new-theme` and fill in the few questions at the prompts:

```
> bin/plugin devtools newtheme
Enter Theme Name: MyTheme
Enter Theme Description: My New Custom Theme
Enter Developer Name: Johnny Rotten
Enter Developer Email: johnny@rotten.com
Please choose a template type
  [pure-blank ] Basic Theme using Pure.css
  [inheritance] Inherit from another theme
  [copy       ] Copy another theme
 > pure-blank

SUCCESS theme mytheme -> Created Successfully

Path: /home/johnnyr/webroot/grav-installation/user/themes/mytheme
```

There are **three template creation options**

1. `pure-blank` - This is a very basic blank theme that uses the [Pure CSS framework](http://purecss.io/)
2. `inheritance` - This creates a very basic template with minimal files that inherits a base theme.  To find out more about theme inheritance, [check out the subject in more details on the Grav Learn site](https://learn.getgrav.org/themes/customization#theme-inheritance).
3. 'copy' - This allows you to create a new theme based on an existing theme.  This is the simplest way to get started with a new theme by using another theme as the basis.




