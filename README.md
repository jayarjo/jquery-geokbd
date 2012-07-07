# jquery-geokbd

Type Georgian letters without having Georgian keyboard installed in the system

## Getting Started
First of all this is jQuery plugin, which means that you have to include jQuery first, then the plugin:

```html
<!doctype>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Very Important Document #5</title>

<link rel="stylesheet" type="text/css" href="geokbd/jquery.geokbd.css" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="geokbd/jquery.geokbd.js"></script>
</head>

<body>
	...
```

It is possible to switch the plugin for specific forms, or even input elements (input[type="text"] and textarea) only, but right now plugin operates only in the simplest mode, thus activates georgian keyboard on all input elements that exist on the page.

```html
<input id="kbd-switcher" type="checkbox" />

<script>
	jQuery('#kbd-switcher').geokbd();
</script>
```

## License
Copyright (c) 2012 Davit Barbakadze  
Licensed under the MIT license.
