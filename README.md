# Script Detector
JavaScript code to detect if determined scripts are being used in the page

# How to use

## Detecting local files

### Allowing scripts from local files globally
```javascript
ScriptDetector.allowLocalFiles();
```

### Detecting strings from local files globally
```javascript
ScriptDetector.disallowLocalFiles();
```

## Detecting all Chrome extensions

### Not detecting scripts from all Chrome extensions globally
```javascript
ScriptDetector.allowAllChromeExtensions();
```

### Detecting scripts from all Chrome extensions globally
```javascript
ScriptDetector.disallowAllChromeExtensions();
```

## Detecting scripts from specific Chrome extensions

### Clearing Chrome extensions' IDs
```javascript
ScriptDetector.clearChromeExtensionsIds();
```

### Setting Chrome extensions' IDs
```javascript
ScriptDetector.setChromeExtensionsIds([
  'abcdefghijklmnopqrstuvwxyz',
  'zyxwvutsrqponmlkjihgfedcba'
]);
```

## Detecting scripts from specific domains

### Setting domains
```javascript
ScriptDetector.setDomains([
  'domain1.com',
  'domain2.com'
]);
```

## Detecting scripts with specific filenames

### Setting filenames
```javascript
ScriptDetector.setFilenames([
  'script1.js',
  'script2.js'
]);
```

## Detecting scripts that matches regular expressions

### Setting regular expressions
```javascript
ScriptDetector.setRegularExpressions([
  /domain1\.com/gi,
  /script1\.js/gi
]);
```

## Detection from time to time

### Setting the timer interval
```javascript
ScriptDetector.setTimer(15000); // 15 seconds
```

### Stopping the timer
```javascript
ScriptDetector.stopTimer();
```

### Starting the timer
```javascript
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
ScriptDetector.doVerification(
  function (detected) {
    console.log('Scripts Detected:', detected);
  },
  function () {
    console.log('Nothing detected');
  }
);
```
