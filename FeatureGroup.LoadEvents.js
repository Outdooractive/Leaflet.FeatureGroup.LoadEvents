(function () {

    // Public API

    var FG  = L.FeatureGroup
    ,   FGp = FG.prototype;
    
    FG.LoadEvents = FG.extend({
        includes      : L.Mixin.Events,
        addLayer      : FGLE_addLayer,
        removeLayer   : FGLE_removeLayer
    });

    FG.loadEvents = function (layerarr) {
        return new FG.LoadEvents(layerarr);
    }
    
    // Public API implementation

    function FGLE_addLayer(layer)
    {
        _FGLE_ensure_init(this);
        
        var id = this.getLayerId(layer);
        if (!(id in this._id2ctx))
        {
            delete this._id2ldg[id];
            var ctx = this._id2ctx[id] = {
                lg : this,
                id : id
            };
            layer.on({
                loading : _FGLE_on_loading,
                load    : _FGLE_on_load
            }, ctx);
        }

        return FGp.addLayer.apply(this, arguments);
    }

    function FGLE_removeLayer(layer)
    {
        _FGLE_ensure_init(this);

        var id = this.getLayerId(layer);
        if (id in this._id2ctx)
        {
            var ctx = this._id2ctx[id];
            layer.off({
                loading : _FGLE_on_loading,
                load    : _FGLE_on_load
            }, ctx);

            delete this._id2ctx[id];
            delete this._id2ldg[id];
        }

        return FGp.removeLayer.apply(this.arguments);
    }

    // Private details

    function _FGLE_ensure_init(that)
    {
        if (!that._id2ctx)
        {
            that._id2ctx = {};
            that._id2ldg = {};
        }
    }

    function _FGLE_on_loading()
    {
        var ctx = this,
            lg  = this.lg,
            id  = this.id,

            id2ldg = lg._id2ldg;

        if (!(id in id2ldg))
        {
            var is_starting = !_FGLE_is_loading_some(id2ldg);

            // Update
            id2ldg[id] = true;

            // Notify
            if (is_starting)
                lg.fire('loading');
        }
    }

    function _FGLE_on_load()
    {
        var ctx = this, 
            lg  = this.lg, 
            id  = this.id,

            id2ldg = lg._id2ldg;

        if (id in id2ldg)
        {
            // Update
            delete id2ldg[id];

            // Notify
            if (!_FGLE_is_loading_some(id2ldg))
                lg.fire('load');
        }
    }

    function _FGLE_is_loading_some(id2ldg)
    {
        for (var id in id2ldg)
            if (id2ldg.hasOwnProperty(id))
                return true;

        return false;
    }
    
})();
