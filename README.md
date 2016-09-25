# Script Detector
JavaScript code to detect if determined scripts are being used in the page

# How to use

## Detecting local files

### Allowing scripts from local files globally
```javascript
/* 
 * allowLocalFiles()
 * 
 * Needs no arguments
 */

ScriptDetector.allowLocalFiles();
```

### Detecting strings from local files globally
```javascript
/* 
 * disallowLocalFiles()
 * 
 * Needs no arguments
 */

ScriptDetector.disallowLocalFiles();
```

## Detecting all Chrome extensions

### Not detecting scripts from all Chrome extensions globally
```javascript
/* 
 * allowAllChromeExtensions()
 * 
 * Needs no arguments
 */

ScriptDetector.allowAllChromeExtensions();
```

### Detecting scripts from all Chrome extensions globally
```javascript
/* 
 * disallowAllChromeExtensions()
 * 
 * Needs no arguments
 */

ScriptDetector.disallowAllChromeExtensions();
```

## Detecting scripts from specific Chrome extensions

### Clearing Chrome extensions' IDs
```javascript
/* 
 * clearChromeExtensionsIds()
 * 
 * Needs no arguments
 */

ScriptDetector.clearChromeExtensionsIds();
```

### Setting Chrome extensions' IDs
```javascript
/* 
 * setChromeExtensionsIds(<chromeExtensionsIds>)
 * 
 * Needs an array of strings as argument
 */

ScriptDetector.setChromeExtensionsIds([
  'abcdefghijklmnopqrstuvwxyz',
  'zyxwvutsrqponmlkjihgfedcba'
]);
```

## Detecting scripts from specific domains

### Clearing domains
```javascript
/* 
 * clearDomains()
 * 
 * Needs no arguments
 */

ScriptDetector.clearDomains();
```

### Setting domains
```javascript
/* 
 * setDomains(<domains>)
 * 
 * Needs an array of strings as argument
 */

ScriptDetector.setDomains([
  'domain1.com',
  'domain2.com'
]);
```

## Detecting scripts with specific filenames

### Clearing filenames
```javascript
/* 
 * clearFilenames()
 * 
 * Needs no arguments
 */

ScriptDetector.clearFilenames();
```

### Setting filenames
```javascript
/* 
 * setFilenames(<filenames>)
 * 
 * Needs an array of strings as argument
 */

ScriptDetector.setFilenames([
  'script1.js',
  'script2.js'
]);
```

## Detecting scripts that matches regular expressions

### Clearing regular expressions
```javascript
/* 
 * clearRegularExpressions()
 * 
 * Needs no arguments
 */

ScriptDetector.clearRegularExpressions();
```

### Setting regular expressions
```javascript
/* 
 * setRegularExpressions(<regularExpressions>)
 * 
 * Needs an array of regular expressions as argument
 */

ScriptDetector.setRegularExpressions([
  /domain1\.com/gi,
  /script1\.js/gi
]);
```

## Detection from time to time

### Setting the timer interval
```javascript
/* 
 * setTimer(<timer>)
 * 
 * Needs an integer as argument
 * <timer> is in milliseconds
 * Negative values will disable the timer
 * Zero value will run as fast as possible
 */

ScriptDetector.setTimer(15000); // 15 seconds
```

### Stopping the timer
```javascript
/* 
 * stopTimer()
 * 
 * Needs no arguments
 */

ScriptDetector.stopTimer();
```

### Starting the timer
```javascript
/* 
 * startTimer([callbackFound], [callbackNotFound], [timer])
 * 
 * First argument is optional and should be a function or null
 * It is a callback function that will be called when any script is detected
 *
 * Second argument is optional and should be a function or null
 * It is a callback function that will be called when no one script is detected
 *
 * Third argument is optional and should be an integer
 * It will set the timer interval
 */

ScriptDetector.startTimer(
  function (detected) {
    console.log('Scripts Detected:', detected);
  },
  function () {
    console.log('Nothing detected');
  }
);
```

## Manual detection

### Calling the detector manually
```javascript
/* 
 * detect([callbackFound], [callbackNotFound])
 * 
 * First argument is optional and should be a function or null
 * It is a callback function that will be called when any script is detected
 *
 * Second argument is optional and should be a function or null
 * It is a callback function that will be called when no one script is detected
 */

ScriptDetector.detect(
  function (detected) {
    console.log('Scripts Detected:', detected);
  },
  function () {
    console.log('Nothing detected');
  }
);
```
