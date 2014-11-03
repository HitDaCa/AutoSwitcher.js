#AutoSwitcher.js
===============

Create tabbed content on the fly (requires jQuery)

##Howto:

```
$( document ).ready(function() {
    var switcher = new AutoSwitcher();
    
    switcher.function_a = function(trigger, collection) {
        console.log("showing");
        console.log(trigger);
        console.log(collection);
    }
    
    switcher.function_b = function(trigger, collection) {
        console.log("hiding");
        console.log(trigger);
        console.log(collection);
    }
    
    switcher.init({
        ".button1" : {
            "showStart" : true,
            "elements" : [
                ".showhide1",   
                "#showhide2"  
            ],
            "activeClass" : "active",
            "onShowCall" : "function_a",
            "onHideCall" : "function_b"
            
        },
        "#button2" : {
            "elements" : [
                ".showhide3",   
                "#showhide4"   
            ],
            "activeClass" : "active",
            "onShowCall" : "function_a"
        },
        "button" : {
            "elements" : [
                ".showhide1",   
                "#showhide2",  
                ".showhide5",   
                "#showhide6" 
            ],
            "activeClass" : "active"
        }
    }); 
});

```
