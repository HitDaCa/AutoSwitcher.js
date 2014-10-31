/**
 * AutoSwitcher 
 * Springload - 2014
 *
 **/

function AutoSwitcher()
{
    var _this;

    /**
     * Initiate
     * @param opt
     */
    this.init = function(opt)
    {
        _this = this;
        
        var blockArray = {},
            clickHolder = [];

        if (typeof opt === "object") {
            for(var key in opt) {
                
                console.log(key);
                
                var ase = new ASElement();
                ase.init(opt[key])
                
                var jItem = $(key);
                jItem.data( "name", key )
                
                // initiate submit handler
               jItem.on("click", function(e) {
                    
                    console.log("clicked " + $(this).data("name"));
                    
                    e.preventDefault();
                    e.stopPropagation();
     
                    _this.triggerSwitch($(this).data("name"));

                });
                
                blockArray[key] = ase; 
            }
        }
        
        _this.set("items", blockArray);
        
        _this.startup();
    
    };
    
    /**
     *
     * show emelemts with showstartup
     *
     */
    this.startup = function()
    {
        var blockArray = _this.get("items");
        
        for(var name in blockArray) {
            if (! blockArray[name].hasStartup()) {
                blockArray[name].hide();
            }
        }
        
        for(var name in blockArray) {
            if (blockArray[name].hasStartup()) {
                blockArray[name].show();
            } 
        }
    }
    
    /**
     *
     * triggers show and hide on elements
     *
     */
    this.triggerSwitch = function(key)
    {
        var blockArray = _this.get("items");
        
        for(var name in blockArray) {
            
            if (name != key) {
                blockArray[name].hide();
            } 
        }
        
         for(var name in blockArray) {
            
            if (name == key) {
                blockArray[name].show();
            } 
        }
    }

    /**
     * Public setter
     *
     * @param name
     * @param property
     */
    this.set = function(name, property)
    {
        _this[name] = property;
    };

    /**
     * Public getter
     *
     * @param name
     * @returns {*}
     */
    this.get = function(name)
    {
        return _this[name];
    };
}

function ASElement()
{
    var _this;

    /**
     * Initiate
     * @param opt
     */
    this.init = function(opt)
    {
        _this = this;

        if (typeof opt === "object") {
            
            if (opt.hasOwnProperty("showStart") ) {
                _this.set("showStart", true);
            } else {
                _this.set("showStart", false);
            }
            
            if (opt.hasOwnProperty("elements") ) {
                _this.set("elements", opt['elements']);
            } else {
                _this.set("elements", []);
            }
        }
    };
    
    /**
     *
     * has a show on startup set
     *
     */
    this.hasStartup = function()
    {
        return _this.get("showStart");
    }
    
    /**
     *
     * show all elements
     *
     */
    this.show = function()
    {
        var elArray = _this.get("elements");
        
        for(var item in elArray) {
            $(elArray[item]).show();
        }
    };
    
    /**
     *
     * hide all elements
     *
     */
    this.hide = function()
    {
        var elArray = _this.get("elements");
        
        for(var item in elArray) {
            $(elArray[item]).hide(); 
        }   
    };
    
    /**
     * Public setter
     *
     * @param name
     * @param property
     */
    this.set = function(name, property)
    {
        _this[name] = property;
    };

    /**
     * Public getter
     *
     * @param name
     * @returns {*}
     */
    this.get = function(name)
    {
        return _this[name];
    };
}
