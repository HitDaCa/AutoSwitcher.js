#AutoSwitcher.js
===============

Create tabbed content on the fly (requires jQuery)

##Howto:

```
$( document ).ready(function() {
    
    var switcher = new AutoSwitcher();

    switcher.init({
        ".button1" : {
            "showStart" : true,
            "elements" : [
                ".showhide1",   
                "#showhide2"  
            ]
        },
        "#button2" : {
            "elements" : [
                ".showhide3",   
                "#showhide4"   
            ]
        },
        "button" : {
            "elements" : [
                ".showhide1",   
                "#showhide2",  
                ".showhide5",   
                "#showhide6" 
            ]
        }
    }); 
    
});
```
