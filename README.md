# FeatureGroup with "loading" and "load" events for Leaflet 0.7.*

This Leaflet plugin extends `L.FeatureGroup` into a new class
`L.FeatureGroup.LoadEvents` that supports the `"loading"` and `"load"`
events, by aggregating the `"loading"` and `"load"` events fired by the
sublayers.

For example, for a `FeatureGroup.LoadEvents` with 3 sublayers L1,L2,L3:
 * L1 fires `"loading"`
   * => the `FeatureGroup.LoadEvents` fires `"loading"` as well.
 * L2:`"loading"`, L1:`"load"`, L3:`"loading"`, L3:`"load"` 
   * => the `FeatureGroup.LoadEvents` remains silent, because in all cases at least one sublayer is still loading.
 * L2:`"load"`
   * => the `FeatureGroup.LoadEvents` fires `"load"`, because all sublayers have loaded.
  
Some possible uses:
 * design your own loading indicator for groups of tilelayers.
 * circumvent [difficulties](https://github.com/Leaflet/Leaflet/pull/4530#issuecomment-216575291) with existing loading indicators like [`Control.Loading`](https://github.com/ebrelsford/Leaflet.loading).

Note: If none of the sublayer fires `"loading"` and `"load"`, then `FeatureGroup.LoadEvents` won't fire those events either.

## Live Example

http://outdooractive.github.io/Leaflet.FeatureGroup.LoadEvents/

## Remark

One could patch `FeatureGroup` directly, but on the other hand:

 * that might be too much additional code for Leaflet's core, for a
not-so-core-ish functionality,
 * and there are deeper [design issues](https://github.com/Leaflet/Leaflet/pull/4530#issuecomment-216519169).
