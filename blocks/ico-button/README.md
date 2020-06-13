# Ico button
Optimized for buttons and links.
Background icons or svg sprites.

## Ico button tag with background image
```
<button type="button" class="ico-button ico-button_img">
	<span class="ico-button__label">Button</span>
</button>
```

## Ico button tag with inlined svg (or sprite)
```
<button type="button" class="ico-button">
	<svg width="24" height="24">
		<use xlink:href="#sprite"></use>
	</svg>
	<span class="ico-button__label">Button</span>
</button>
```

## Link tag
```
<a href="" class="ico-button ico-button_img">
	<span class="ico-button__label">Button</span>
</a>
```
