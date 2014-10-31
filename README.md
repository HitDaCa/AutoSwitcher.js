#AutoSwitcher.js
===============

Create tabbed content on the fly (requires jQuery)

##Howto:

```
/**
 *
 * test button hide call method
 *
 */
function removeBT1Class(src) {
    
    console.log("global function executed");
    console.log(src); 
    
}

$( document ).ready(function() {
    var switcher = new AutoSwitcher();

    switcher.init({
        ".button1" : {
            "showStart" : true,
            "elements" : [
                ".showhide1",   
                "#showhide2"  
            ],
            "activeClass" : "active",
            "onShowCall" : {
                "type" : "local",
                "function" : "addBT1Class"
            },
            "onHideCall" : {
                "type" : "global",
                "function" : "removeBT1Class"
            }
            
        },
        "#button2" : {
            "elements" : [
                ".showhide3",   
                "#showhide4"   
            ],
            "activeClass" : "active"
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
