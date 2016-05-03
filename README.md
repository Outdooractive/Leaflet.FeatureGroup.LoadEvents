# FeatureGroup with "loading" and "load" events for Leaflet 0.7.*

This plugins extends `L.FeatureGroup` into a new class
`L.FeatureGroup.LoadEvents` that supports the `"loading"` and `"load"`
events.

## Motivation

`FeatureGroup` can be very convenient to group for example several
`TileLayer` together.

On the other hand, there are plugins like
https://github.com/ebrelsford/Leaflet.loading that rely on `TileLayer`'s
events `"loading"` and `"load"`, for example to display a "tile loading indicator".

Such plugin do not work yet with `FeatureGroup`, because it does not
support the `"loading"` and `"load"` events. This is particularly an
issue in conjunction with a `Control` instance
([issue](https://github.com/Leaflet/Leaflet/pull/4530#issuecomment-216559206)).

The present plugin derives a new class `FeatureGroup.LoadEvents` that
support events `"loading"` and `"load"`.

## Live Example

http://outdooractive.github.io/Leaflet.FeatureGroup.LoadEvents/

## Remark

One could patch `FeatureGroup` directly, but on the other hand:

 * that might be too much additional code for Leaflet's core, for a
not-so-core-ish functionality,

 * and there are deeper [design issues](https://github.com/Leaflet/Leaflet/pull/4530#issuecomment-216519169).
