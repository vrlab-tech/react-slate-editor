import cssParser from"css";function transformRules(a,b,c){b.forEach(function(b){var d={};if("media"===b.type){var e=mediaNameGenerator(b.media),f=c[e]=c[e]||{__expression__:b.media};transformRules(a,b.rules,f)}else"rule"===b.type&&(b.declarations.forEach(function(a){if("declaration"===a.type){var b=cleanPropertyName(a.property);d[b]=a.value}}),b.selectors.forEach(function(a){var b=nameGenerator(a.trim());c[b]=d}))})}var cleanPropertyName=function(a){return a=a.replace(/(-.)/g,function(a){return a[1].toUpperCase()}),a},mediaNameGenerator=function(a){return"@media ".concat(a)},nameGenerator=function(a){return a=a.replace(/\s\s+/g," "),a=a.replace(/[^a-zA-Z0-9]/g,"_"),a=a.replace(/^_+/g,""),a=a.replace(/_+$/g,""),a};export function transform(a){if(!a)throw new Error("missing css text to transform");// If the input "css" doesn't wrap it with a css class (raw styles)
// we need to wrap it with a style so the css parser doesn't choke.
var b=!1;-1===a.indexOf("{")&&(b=!0,a=".bootstrapWithCssClass { ".concat(a," }"));var c=cssParser.parse(a),d={};return transformRules(this,c.stylesheet.rules,d),b&&(d=d.bootstrapWithCssClass),d}