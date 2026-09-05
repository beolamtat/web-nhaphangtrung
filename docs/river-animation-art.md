# Animated river assets

Generated using the built-in imagegen tool from `public/images/heritage-landscape.webp` as reference. Originals are retained; WebP copies are used by the homepage.

- Clean background: `public/images/heritage-river.webp`
- Transparent boat: `public/images/heritage-boat.webp`
- Birds, wakes and currents are code-native SVG/CSS in `HeritageMotion.tsx` and `heritage.css`.

## Background prompt

Edit target: the provided Chinese shanshui landscape. Remove ONLY the red-sailed boat in the lower middle and its reflection and oar, filling the area with continuous softly rippling river matching the surrounding ink watercolor. Also remove the tiny birds in the sky so these can be animated separately. Preserve all mountains, pavilion, trees, bridge, sun, paper texture, framing, colors and 1536x1024 composition. No new objects or text. This is a clean background plate for a layered website animation.

## Boat prompt

Input is a style and subject reference. Create an isolated cutout of ONLY the two red-sailed ancient Chinese wooden merchant junk from this painting, with its rigging and tiny cargo detail, viewed in the same three-quarter direction. Genuine transparent background, no water, no landscape, no ground shadow, no rectangular paper background. Preserve fine ink and muted watercolor style, dark brown wood and cinnabar sails. Entire boat and mast visible with a small transparent margin, centered. Asset for gentle animated movement over the original river.

Motion uses transform/opacity animations, pauses offscreen and when the document is hidden, and respects reduced motion. The existing decorative-motion button controls the new layers too.

## Detailed boat with boatmen

Built-in imagegen was used in two passes: first to repaint the merchant junk with two historically plausible boatmen, including one braced in a rowing pose; second to extract the final boat to genuine transparency while leaving the oar as a separate animated code layer. The source asset is `public/images/heritage-boat-detailed.webp`.

Final prompt intent: preserve the ancient red-sailed merchant junk and three-quarter perspective; add two anatomically convincing boatmen, cargo, clothing folds and a rower with hands positioned for a separate sweep oar; keep a genuine transparent background with no water, scenery, text or modern objects.

## Golden carp

Built-in imagegen created `public/images/heritage-carp.webp` as a single transparent, anatomically convincing golden carp in mid-jump, using fine gongbi contours, visible scales, translucent fins, restrained ink wash and no baked water or scenery. Splash, droplets and the jump arc remain code-native so they align with the animated surface.
