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
                
                var jItem = $(key);
                jItem.data("name", key)
                
                var ase = new ASElement();
                opt[key].parent = _this;
                opt[key].clickItem = jItem;
                
                ase.init(opt[key])
               
                // initiate submit handler
               jItem.on("click", function(e) {
                    
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
     * test button show call method
     *
     */
    this.addBT1Class = function(src)
    {
        console.log("local function executed");
        console.log(src);
    }
    
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

            if (opt.hasOwnProperty("parent") ) {
                _this.set("parent", opt['parent']);
            }
            
            if (opt.hasOwnProperty("showStart") ) {
                _this.set("showStart", true);
            } else {
                _this.set("showStart", false);
            }
            
            if (opt.hasOwnProperty("activeClass") ) {
                _this.set("activeClass", opt['activeClass']);
            } 
            
            if (opt.hasOwnProperty("clickItem") ) {
                _this.set("clickItem", opt['clickItem']);
            } 

            if (opt.hasOwnProperty("elements") ) {
                _this.set("elements", opt['elements']);
            } else {
                _this.set("elements", []);
            }
            
            if (opt.hasOwnProperty("onShowCall") ) {
                _this.set("onShowCall", opt['onShowCall']);
            }
            
            if (opt.hasOwnProperty("onHideCall") ) {
                _this.set("onHideCall", opt['onHideCall']);
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
        var elArray = _this.get("elements"),
            opt = {};
        
        for(var item in elArray) {
            $(elArray[item]).show();
        }
        
        if (_this.get("activeClass") && _this.get("clickItem")) {
            _this.get("clickItem").addClass(_this.get("activeClass"));
        }
        
        if (typeof _this.get("onShowCall") === 'object') {
            
            opt = _this.get("onShowCall");
            
            if (opt.hasOwnProperty("type") && opt.hasOwnProperty("function")) {
                
                if (_this.get("parent") && opt['type'] === "local") {
                  
                    _this.get("parent")[opt['function']](_this.get("parent"));
                    
                } else if (_this.get("parent") && opt['type'] === "global") {
                    
                    if (window[opt['function']]) {
                        window[opt['function']](_this.get("parent"));
                    }
                    
                }
            } 
        }
    };
    
    /**
     *
     * hide all elements
     *
     */
    this.hide = function()
    {
        var elArray = _this.get("elements"),
            opt = {};
        
        for(var item in elArray) {
            $(elArray[item]).hide(); 
        }
        
        if (_this.get("activeClass") && _this.get("clickItem")) {
            _this.get("clickItem").removeClass(_this.get("activeClass"));
        }
        
        if (typeof _this.get("onHideCall") === 'object') {
            
            opt = _this.get("onHideCall");
            
            if (opt.hasOwnProperty("type") && opt.hasOwnProperty("function")) {
                
                if (_this.get("parent") && opt['type'] === "local") {
                    
                    _this.get("parent")[opt['function']](_this.get("parent"));
                    
                } else if (_this.get("parent") && opt['type'] === "global") {
                    
                    if (window[opt['function']]) {
                        window[opt['function']](_this.get("parent"));
                    }
                    
                }
            } 
            
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
