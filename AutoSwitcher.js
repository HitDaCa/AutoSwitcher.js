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
                
                var trigger = $(key);
                trigger.data("name", key)
                
                var ase = new ASElement();
                opt[key].parent = _this;
                opt[key].key = key;
                
                ase.init(opt[key])
               
                // initiate submit handler
               trigger.on("click", function(e) {
                    
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
            
            if (opt.hasOwnProperty("key") ) {
                _this.set("trigger", $(opt['key']));
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
        
        if (_this.get("activeClass") && _this.get("trigger")) {
            $(_this.get("trigger")).addClass(_this.get("activeClass"));
        }
        
        if (typeof _this.get("onShowCall") === 'string') {
            
            if (_this.get("parent") && _this.get("parent")[_this.get("onShowCall")]) {
                _this.get("parent")[_this.get("onShowCall")](this.get("trigger"), this.get("parent").get("items"));
            } else if (window[_this.get("onShowCall")]) {
                window[_this.get("onShowCall")](this.get("trigger"), this.get("parent").get("items"));
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
        
        if (_this.get("activeClass") && _this.get("trigger")) {
            $(_this.get("trigger")).removeClass(_this.get("activeClass"));
        }
        
        if (typeof _this.get("onHideCall") === 'string') {
            
            if (_this.get("parent") && _this.get("parent")[_this.get("onHideCall")]) {
                _this.get("parent")[_this.get("onHideCall")](this.get("trigger"), this.get("parent").get("items"));
            } else if (window[_this.get("onHideCall")]) {
                window[_this.get("onHideCall")](this.get("trigger"), this.get("parent").get("items"));
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

